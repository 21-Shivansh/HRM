import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../Components/TalentCornerLogo.jpeg';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onLogin(username);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-root">
      <div className="login-left">
        <h1 className="login-title">CRM-Mini</h1>
        <p className="login-subtitle">Enter your credentials to access your account</p>
        <form className="login-form" noValidate autoComplete="off">
          <div className="login-form-group">
            <label htmlFor="username" className="login-label">Email address/Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
            </div>
          </div>
          <div className="login-form-group">
            <label className="login-checkbox-label">
              <input type="checkbox" className="login-checkbox" />
              Remember for 30 days
            </label>
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="login-footer">
          <img src={Logo} alt="Logo" className="login-logo" />
          <p className="login-footer-text">Talent Corner HR Services Pvt Ltd</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-nav">
          <button className="login-nav-button">Home</button>
          <button className="login-nav-button">About Us</button>
          <button className="login-nav-button">Blog</button>
        </div>
        <img src={Logo} alt="Logo" className="login-right-logo" />
      </div>
    </div>
  );
};

export default Login;