import React, {useState, useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavbarProvider, NavbarContext } from './NavbarFooter/NavbarContext';

import './App.css';

import Login from './NavbarFooter/Login';
import Navbar from './NavbarFooter/Navbar';
import AppBar from './NavbarFooter/AppBar';

import PayrollReports from './NavBarItems/PayrollReports';
import StatutoryCompliance from './NavBarItems/StatutoryCompliance';
import Settings from './NavBarItems/Settings';

import Dashboard from './Dashboard/Dashboard';

import AddEmployee from './EmployeeManagement/AddEmployee';
import UpdateEmployee from './EmployeeManagement/UpdateEmployee';
import EmployeeList from './EmployeeManagement/EmployeeList';

import Payroll from './PayrollProcessing/Payroll';
import GeneratePaySlip from './PayrollProcessing/GeneratePaySlip';
import GenerateTDS from './PayrollProcessing/GenerateTDS';
import SalaryPayment from './PayrollProcessing/SalaryPayment';

import AttendanceReports from './Reports/AttendanceReports';
import Form16 from './Reports/Form16';
import PaySheet from './NavBarItems/PaySheet';
import PaySlip from './NavBarItems/PaySlip';

import TaskDashboard from './TaskManagement/TaskDashboard';
import AssignTasks from './TaskManagement/AssignTasks';
import MyTasks from './TaskManagement/MyTasks';
import TaskDelegated from './TaskManagement/TaskDelegated';
import TaskCategories from './TaskManagement/TaskCategories';
import TaskTemplate from './TaskManagement/TaskTemplate/TaskTemplate';

function AppContent ({ handleLogout }) {
  const { navbarOpen } = useContext(NavbarContext);

  return (
    <div className={`App ${navbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <Navbar />
      <AppBar handleLogout={handleLogout} />
      <Routes>
        <Route path="/payroll-reports" element={<PayrollReports />} />
        <Route path="/statutory-compliance" element={<StatutoryCompliance />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee" element={<UpdateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />

        <Route path="/payroll-statements" element={<Payroll />} />
        <Route path="/generate-payslip" element={<GeneratePaySlip />} />
        <Route path="/salary-payment" element={<SalaryPayment />} />

        <Route path="/generate-tds-report" element={<GenerateTDS />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />
        <Route path="/form-16" element={<Form16 />} />
        <Route path="/pay-slip" element={<PaySlip />} />
        <Route path="/pay-sheet" element={<PaySheet />} />

        <Route path="/task-management" element={<TaskDashboard />} />
        <Route path="/assign-tasks" element={<AssignTasks />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/task-delegated" element={<TaskDelegated />} />
        <Route path="/task-template" element={<TaskTemplate />} />

        <Route path="/task-categories" element={<TaskCategories />} />
      </Routes>
    </div>
  );
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavbarProvider>
      <Router>
        {isLoggedIn ? (
          <AppContent handleLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Router>
    </NavbarProvider>
  );
}

export default App;