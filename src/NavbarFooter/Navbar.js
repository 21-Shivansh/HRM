import React, { useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarContext } from './NavbarContext.js';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TCLogo from '../Components/TalentCornerLogo.jpeg'
import { Dashboard } from '@mui/icons-material';

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
    if (!navbarOpen) {
      toggleNavbar();
    }
    setDropdownOpen(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleNavLinkClick = () => {
    if (navbarOpen) {
      toggleNavbar();
      setDropdownOpen(Array(5).fill(false));
    }
  };

  const navItems = [
    { title: 'Dashboard', icon: 'fa-tachometer-alt', path: '/', links: [] },
    { title: 'Employee Management', icon: 'fa-users', path: '/employee-management', links: [
      { name: 'Add Employee', path: '/add-employee' },
      { name: 'Update Employee', path: '/update-employee' },
      { name: 'Employee List', path: '/employee-list' }
    ]},
    { title: 'Payroll Processing', icon: 'fa-money-check-alt', path: '/payroll-processing', links: [
      { name: 'Generate Payslip', path: '/generate-payslip' },
      { name: 'Generate TDS Report', path: '/generate-tds-report' },
      { name: 'Salary Payment', path: '/salary-payment' }
    ]},
    { title: 'Reports', icon: 'fa-chart-line', path: '/reports', links: [
      { name: 'Attendance Reports', path: '/attendance-reports' },
      { name: 'Payroll Statements', path: '/payroll-statements' },
      { name: 'Form 16', path: '/form-16' },
      { name: 'Pay Sheet', path: '/pay-sheet' },
      { name: 'Pay Slip', path: '/pay-slip' },
      { name: 'Statutary Compliance', path: '/statutary-compliance' },
      { name: 'Tax Continuation', path: '/tax-continuation' }
    ]},
    { title: 'Task Management', icon: 'fa-tasks', path: '/task-management', links: [
      { name: 'Task Dashboard', path: '/task-management' },
      { name: 'Assign New Task', path: '/assign-tasks' },
      { name: 'My Tasks', path: '/my-tasks' },
      { name: 'Task Delegated', path: '/task-delegated' },
      { name: 'Task Categories', path: '/task-categories' },
      { name: 'Task Templates', path: '/task-template' }
    ]}
  ];

  return (
    <div>
      <div className={`navbar ${navbarOpen ? 'open' : ''}`}>
        <div className="navbar-header" onClick={handleToggleNavbar}>
          <img src={TCLogo} alt="Talent Corner Logo" className="navbar-logo" />
          <span className="navbar-title">Talent Corner</span>
          <span className={`right-arrow ${navbarOpen ? 'open' : ''}`} >
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
                    <NavLink 
                      to={link.path} 
                      activeclassname="active" 
                      className="dropdown-text" 
                      key={linkIndex}
                      onClick={handleNavLinkClick} // Add onClick event to close the navbar
                    >
                      {link.name}
                    </NavLink>
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