import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './AppBar.css';
import { NavbarContext } from './NavbarContext';

function AppBar() {
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Employees', path: '/employees' },
    { title: 'Payroll Reports', path: '/payroll-reports' },
    { title: 'Statutory Compliance', path: '/statutory-compliance' },
    { title: 'Task Management', path: '/task-management' },
    { title: 'Settings', path: '/settings' },
    { title: 'Logout', path: '/logout' },
  ];

  const { navbarOpen} = useContext(NavbarContext);

  return (
    <div className={`app-bar ${navbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <ul className="app-bar-list">
        {navItems.map((item, index) => (
          <li key={index} className="app-bar-item">
            <NavLink to={item.path} activeClassName="active" className="app-bar-link">
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppBar;