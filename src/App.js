import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavbarProvider, NavbarContext } from './NavbarFooter/NavbarContext';

import './App.css';

import Navbar from './NavbarFooter/Navbar';
import AppBar from './NavbarFooter/AppBar';

import AddEmployee from './EmployeeManagement/AddEmployee';
import UpdateEmployee from './EmployeeManagement/UpdateEmployee';
import EmployeeList from './EmployeeManagement/EmployeeList';

import Payroll from './PayrollProcessing/Payroll';
import GeneratePaySlip from './PayrollProcessing/GeneratePaySlip';
import GenerateTDS from './PayrollProcessing/GenerateTDS';

import AttendanceReports from './Reports/AttendanceReports';
import Form16 from './Reports/Form16';

function AppContent () {
  const { navbarOpen } = useContext(NavbarContext);

  return (
    <div className={`App ${navbarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <Navbar />
      <AppBar />
      <Routes>
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee" element={<UpdateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/payroll-statements" element={<Payroll />} />
        <Route path="/generate-payslip" element={<GeneratePaySlip />} />
        <Route path="/generate-tds-report" element={<GenerateTDS />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />
        <Route path="/form-16" element={<Form16 />} />
      </Routes>
    </div>
  );
}

function App() {

  return (
    <NavbarProvider>
      <Router>
        <AppContent />
      </Router>
    </NavbarProvider>
  );
}

export default App;