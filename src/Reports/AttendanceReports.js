import React, { useState, useMemo } from 'react';
import { FaDownload } from 'react-icons/fa';
import './AttendanceReports.css';

const AttendanceReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [attendanceData, setAttendanceData] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === 1) {
      return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex];
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      setAttendanceData(data.map(emp => ({ ...emp, unpaidLeaves: emp.unpaid_leaves || 0 })));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useState(() => {
    fetchEmployees();
  }, []);

  const calculatePayable = (emp) => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const dailySalary = emp.salary / daysInMonth;
    const extraUnpaid = Math.max(emp.unpaidLeaves - 2, 0);
    return emp.salary - extraUnpaid * dailySalary;
  };

  const filteredEmployees = useMemo(() => {
    return attendanceData.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [attendanceData, searchTerm]);

  const handleUnpaidLeaveChange = async (id, value) => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const newValue = Math.min(Math.max(parseInt(value) || 0, 0), daysInMonth);

    setAttendanceData((prevData) =>
      prevData.map((emp) =>
        emp.id === id ? { ...emp, unpaidLeaves: newValue } : emp
      )
    );

    try {
      const response = await fetch('http://localhost:5000/api/employees/unpaid-leaves', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: id, unpaid_leaves: newValue }),
      });

      if (!response.ok) {
        console.error('Failed to update unpaid leaves in the database');
      }
    } catch (error) {
      console.error('Error updating unpaid leaves:', error);
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <div className="div1">
          <h1 className="header">Employee Attendance</h1>
          <p className="subtext">All the employees of the company are listed here</p>
        </div>
        <div className="div2">
          <button className="download-btn"><FaDownload /></button>
          <button className="Add">+ Add Employee</button>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Employee Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="year-dropdown"
        >
          <option value="" disabled>YEAR</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-dropdown"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="attendance-table">
        <div>
          <h2>{selectedMonth}</h2>
        </div>
        <div>
          <table>
            <thead className='table-head'>
              <tr>
                <th>Employee Name</th>
                <th>Days in Month</th>
                <th>Paid Leaves</th>
                <th>Unpaid Leaves</th>
                <th>Present Days</th>
                <th>Payable Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{getDaysInMonth(selectedMonth, selectedYear)}</td>
                  <td>2</td>
                  <td>
                    <input
                      type="number"
                      value={emp.unpaidLeaves}
                      onChange={(e) => handleUnpaidLeaveChange(emp.id, e.target.value)}
                      min="0"
                      className="unpaid-leave-input"
                    />
                  </td>
                  <td>{getDaysInMonth(selectedMonth, selectedYear) - emp.unpaidLeaves}</td>
                  <td>₹ {calculatePayable(emp).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
