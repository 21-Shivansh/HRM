import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(false);

  const handleSave = () => {
    // Logic to save settings
    console.log('Settings saved');
  };

  return (
    <div className="settings-root">
      <div className="settings-paper">
        <h4 className="settings-title">Settings</h4>
        <form noValidate autoComplete="off">
          <div className="settings-grid">
            <div className="settings-grid-item">
              <label htmlFor="username" className="settings-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="settings-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="settings-grid-item">
              <label htmlFor="email" className="settings-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="settings-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="settings-grid-item">
              <label htmlFor="password" className="settings-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="settings-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="settings-grid-item">
              <label htmlFor="notifications" className="settings-label">Notifications</label>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                className="settings-checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </div>
            <div className="settings-grid-item">
              <button type="button" className="settings-button" onClick={handleSave}>
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;