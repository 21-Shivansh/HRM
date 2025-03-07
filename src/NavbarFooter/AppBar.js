import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AppBar.css';
import { NavbarContext } from './NavbarContext';

function AppBar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Employees', path: '/employee-list' },
    { title: 'Payroll Reports', path: '/payroll-reports' },
    { title: 'Statutory Compliance', path: '/statutory-compliance' },
    { title: 'Task Management', path: '/task-history' },
    { title: 'Settings', path: '/settings' },
    { title: 'Logout', path: '/logout' },
  ];

  const { navbarOpen } = useContext(NavbarContext);
  const navigate = useNavigate();

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

  return (
    <div className={`app-bar ${navbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {menuOpen ? '✖' : '☰'}
      </div>
      <ul className={`app-bar-list ${menuOpen ? 'show' : ''}`}>
        {navItems.map((item, index) => (
          <li key={index} className="app-bar-item" onClick={handleMenuItemClick}>
            {item.title === 'Logout' ? (
              <a href="/logout" onClick={handleLogoutClick} className="app-bar-link">
                {item.title}
              </a>
            ) : (
              <NavLink to={item.path} activeclassname="active" className="app-bar-link">
                {item.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppBar;