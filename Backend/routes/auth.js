const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({
                success: false,
                message: "The user already exists!",
              });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPwd = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashPwd;

        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "You've successfully signed up, please login now!",
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "user does not exist Please Register",
            });
        }
        console.log(req.body);
        console.log(user.password);

        const validPassword = await bcrypt.compare(req.body.password, user.password );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Sorry, invalid password entered!",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, {
            expiresIn: "1d",
        });

        res.send({
            success: true,
            message: "You've successfully logged in!",
            token: token,
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
    const user = await User.findById(req.body.userId).select("-password");
  
    res.send({
      success: true,
      message: "You are authorized to go to the protected route!",
      data: user,
    });
});

module.exports = router;
