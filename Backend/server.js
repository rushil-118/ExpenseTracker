const express = require('express');
const cors = require('cors')
require('dotenv').config();
const dbConfig = require('./config/dbConfig')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});