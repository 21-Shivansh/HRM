import React, { useState, useMemo } from 'react';
import './AttendanceReports.css';

const AttendanceReports = () => {
  const employeeOptions = [
    { id: "E001", name: "Aagam Sheth", salary: 30000 },
    { id: "E002", name: "Avadai Marthuvar", salary: 28000 },
    { id: "E003", name: "Hrutika Mohal", salary: 25000 },
    { id: "E004", name: "Jahnvi Thakker", salary: 27000 },
    { id: "E005", name: "Joyeeta Khaskel", salary: 26000 },
    { id: "E006", name: "Komal Bhanushali", salary: 24000 },
    { id: "E007", name: "Preshita Rane", salary: 23000 },
    { id: "E008", name: "Priyanka Panjwani", salary: 29000 },
    { id: "E009", name: "Rajalaxmi Das", salary: 31000 },
    { id: "E010", name: "Rashesh Doshi", salary: 32000 },
    { id: "E011", name: "Rushali Rajgor", salary: 27000 },
    { id: "E012", name: "Snehal Kadu", salary: 26000 },
    { id: "E013", name: "Surbhi Jain", salary: 28000 },
    { id: "E014", name: "Vaishnavi Bhagat", salary: 25000 },
    { id: "E015", name: "Vedika Tolani", salary: 29000 },
    { id: "E016", name: "Jagruti Doshi", salary: 27000 },
    { id: "E017", name: "Kajal Khamkar", salary: 26000 },
    { id: "E018", name: "Nishi Doshi", salary: 28000 },
    { id: "E019", name: "Deepti Singh", salary: 25000 },
    { id: "E020", name: "Bankim Doshi", salary: 31000 },
    { id: "E021", name: "Nita Doshi", salary: 32000 },
    { id: "E022", name: "Pragya Doshi", salary: 27000 },
    { id: "E023", name: "Chaitali Doshi", salary: 26000 },
    { id: "E024", name: "Preeti Doshi", salary: 28000 },
    { id: "E025", name: "Kinjal Patel", salary: 25000 },
    { id: "E026", name: "Minal Sanghvi", salary: 29000 },
    { id: "E027", name: "Jigna Sanghvi", salary: 27000 },
    { id: "E028", name: "Saumya Kirit Gala", salary: 26000 },
    { id: "E029", name: "Shreya Santosh Talashilkar", salary: 28000 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [attendanceData, setAttendanceData] = useState(
    employeeOptions.map((emp) => ({
      ...emp,
      unpaidLeaves: 0,
      presentDays: 0,
    }))
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());

  const getDaysInMonth = (month, year) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === 1) { // February
      return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex];
  };
  
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

  const handleDownload = () => {
    const csvContent = `Employee Name,Days in Month,Paid Leaves,Unpaid Leaves,Present Days,Payable Amount\n` +
      filteredEmployees.map(emp =>
        `${emp.name},${getDaysInMonth(selectedMonth, selectedYear)},2,${emp.unpaidLeaves},${getDaysInMonth(selectedMonth, selectedYear) - emp.unpaidLeaves},₹${calculatePayable(emp).toFixed(2)}`
      ).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Attendance_Report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <div className="div1">
          <h1 className="header">Employee Attendance</h1>
          <p className="subtext">All the employees of the company are listed here</p>
        </div>
        <div className="div2">
          <button className="download-btn" onClick={handleDownload}>D</button>
          <button className="Add">+ Add Employee</button>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Employee Name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log("Search Term:", e.target.value); // Debugging line
          }}
        />

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="" disabled>YEAR</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
            <thead>
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
                  <td>{emp.unpaidLeaves}</td>
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
