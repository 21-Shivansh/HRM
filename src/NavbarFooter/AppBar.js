import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AppBar.css';
import { NavbarContext } from './NavbarContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import the down arrow icon
import { Menu, MenuItem } from '@mui/material';

function AppBar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage profile menu
  const { navbarOpen } = useContext(NavbarContext);
  const navigate = useNavigate();

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Employees', path: '/employee-list' },
    { title: 'Payroll Reports', path: '/payroll-reports' },
    { title: 'Statutory Compliance', path: '/statutory-compliance' },
    { title: 'Task Management', path: '/task-delegated' },
  ];

  const handleLogoutClick = (event) => {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      console.log('Logging out...');
      handleLogout();
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleProfileMenuClose();
  };

  return (
    <div className={`app-bar ${navbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {menuOpen ? '✖' : '☰'}
      </div>
      <ul className={`app-bar-list ${menuOpen ? 'show' : ''}`}>
        {navItems.map((item, index) => (
          <li key={index} className="app-bar-item" onClick={handleMenuItemClick}>
            <NavLink to={item.path} activeclassname="active" className="app-bar-link">
              {item.title}
            </NavLink>
          </li>
        ))}
        <li className="app-bar-item profile-item">
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Billing</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Theme</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </li>
      </ul>
      <NotificationsIcon className="notification-icon" />
      <div className="profile-container" onClick={handleProfileMenuOpen}>
        <AccountCircleIcon className="profile-icon" />
        <span className="profile-name">Admin</span>
        <ArrowDropDownIcon className="down-arrow-icon" />
      </div>
    </div>
  );
}

export default AppBar;