import React, { useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarContext } from './NavbarContext.js';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const { navbarOpen, toggleNavbar } = useContext(NavbarContext);
  const [dropdownOpen, setDropdownOpen] = useState(Array(5).fill(false));

  const handleToggleNavbar = () => {
    if (navbarOpen) {
      setDropdownOpen(Array(5).fill(false)); // Close all dropdowns when navbar is closed
    }
    toggleNavbar();
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const navItems = [
    { title: 'Dashboard', icon: 'fa-tachometer-alt', path: '/dashboard', links: [] },
    { title: 'Employee Management', icon: 'fa-users', path: '/employee-management', links: [
      { name: 'Add Employee', path: '/add-employee' },
      { name: 'Update Employee', path: '/update-employee' },
      { name: 'Employee List', path: '/employee-list' }
    ]},
    { title: 'Payroll Processing', icon: 'fa-money-check-alt', path: '/payroll-processing', links: [
      { name: 'Generate Payslip', path: '/generate-payslip' },
      { name: 'Generate TDS Report', path: '/generate-tds-report' }
    ]},
    { title: 'Reports', icon: 'fa-chart-line', path: '/reports', links: [
      { name: 'Attendance Reports', path: '/attendance-reports' },
      { name: 'Payroll Statements', path: '/payroll-statements' },
      { name: 'Form 16', path: '/form-16' }
    ]},
    { title: 'Task Management', icon: 'fa-tasks', path: '/task-management', links: [
      { name: 'Assign Tasks', path: '/assign-tasks' },
      { name: 'Task History', path: '/task-history' }
    ]}
  ];

  return (
    <div>
      <div className={`navbar ${navbarOpen ? 'open' : ''}`}>
        <div className="navbar-header">
          <span className="navbar-title">Talent Corner</span>
          <span className={`right-arrow ${navbarOpen ? 'open' : ''}`} onClick={handleToggleNavbar}>
            &#9654;
          </span>
        </div>
        <ul className="navbar-list">
          {navItems.map((item, index) => (
            <li className="dropdown" key={index}>
              <div className="dropbtn" onClick={() => toggleDropdown(index)}>
                <i className={`fas ${item.icon} navbar-icon`}></i>
                {navbarOpen && <span className="navbar-text">{item.title}</span>}
                {item.links.length > 0 && navbarOpen && (
                  <span className={`arrow ${dropdownOpen[index] ? 'open' : ''}`}>&#9660;</span>
                )}
              </div>
              {item.links.length > 0 && (
                <div className={`dropdown-content ${dropdownOpen[index] ? 'show' : ''}`}>
                  {item.links.map((link, linkIndex) => (
                    <NavLink to={link.path} activeClassName="active" className="dropdown-text" key={linkIndex}>{link.name}</NavLink>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;