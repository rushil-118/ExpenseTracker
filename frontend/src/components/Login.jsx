import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../calls/users'; // Import login function

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(username, password);
            alert("Login Success");
            localStorage.setItem('token', data.token);
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className='p1'>
                    Don't have an account?&nbsp;
                    <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
