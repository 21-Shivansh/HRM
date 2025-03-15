import React, { useState } from 'react';
import './AttendanceReports.css';

const AttendanceReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeSelection, setEmployeeSelection] = useState('all');
  const [specificEmployee, setSpecificEmployee] = useState('');
  const [exportFormat, setExportFormat] = useState('');

  const employeeOptions = [
    { id: 'E001', name: 'Aagam Sheth' },
    { id: 'E002', name: 'Avadai Marthuvar' },
    { id: 'E003', name: 'Hrutika Mohal' },
    { id: 'E004', name: 'Jahnvi Thakker' },
    { id: 'E005', name: 'Joyeeta Khaskel' },
    { id: 'E006', name: 'Komal Bhanushali' },
    { id: 'E007', name: 'Preshita Rane' },
    { id: 'E008', name: 'Priyanka Panjwani' },
    { id: 'E009', name: 'Rajalaxmi Das' },
    { id: 'E010', name: 'Rashesh Doshi' },
    { id: 'E011', name: 'Rushali Rajgor' },
    { id: 'E012', name: 'Snehal kadu' },
    { id: 'E013', name: 'Surbhi Jain' },
    { id: 'E014', name: 'Vaishnavi Bhagat' },
    { id: 'E015', name: 'Vedika Tolani' },
    { id: 'E016', name: 'Jagruti Doshi' },
    { id: 'E017', name: 'Kajal Khamkar' },
    { id: 'E018', name: 'Nishi Doshi' },
    { id: 'E019', name: 'Deepti Singh' },
    { id: 'E020', name: 'Bankim Doshi' },
    { id: 'E021', name: 'Nita Doshi' },
    { id: 'E022', name: 'Pragya Doshi' },
    { id: 'E023', name: 'Chaitali Doshi' },
    { id: 'E024', name: 'Preeti Doshi' },
    { id: 'E025', name: 'Kinjal Patel' },
    { id: 'E026', name: 'Minal Sanghvi' },
    { id: 'E027', name: 'Jigna Sanghvi' },
    { id: 'E028', name: 'SAUMYA KIRIT GALA' },
    { id: 'E029', name: 'Shreya Santosh Talashilkar' },
  ];

  const handleGenerateReport = () => {
    // Logic to generate attendance report
    console.log('Generating attendance report...');
  };

  return (
    <div className="attendancereports-root">
      <div className="attendancereports-paper">
        <h4 className="attendancereports-title">Generate Attendance Report</h4>
        <form noValidate autoComplete="off">
          <div className="attendancereports-grid">
            <div className="attendancereports-grid-item">
              <h6>Select Date Range</h6>
            </div>
            <div className="attendancereports-grid-item">
              <label htmlFor="startDate" className="attendancereports-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="attendancereports-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="attendancereports-grid-item">
              <label htmlFor="endDate" className="attendancereports-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="attendancereports-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="attendancereports-grid-item">
              <h6>Employee Selection</h6>
            </div>
            <div className="attendancereports-grid-item">
              <div className="attendancereports-radio-group">
                <label className="attendancereports-radio-label">
                  <input
                    type="radio"
                    value="all"
                    checked={employeeSelection === 'all'}
                    onChange={(event) => setEmployeeSelection(event.target.value)}
                  />
                  All Employees
                </label>
                <label className="attendancereports-radio-label">
                  <input
                    type="radio"
                    value="specific"
                    checked={employeeSelection === 'specific'}
                    onChange={(event) => setEmployeeSelection(event.target.value)}
                  />
                  Specific Employees
                </label>
              </div>
            </div>
            {employeeSelection === 'specific' && (
              <div className="attendancereports-grid-item">
                <label htmlFor="specificEmployee" className="attendancereports-label">Specific Employee</label>
                <select
                  id="specificEmployee"
                  className="attendancereports-select"
                  value={specificEmployee}
                  onChange={(event) => setSpecificEmployee(event.target.value)}
                >
                  {employeeOptions.map((employee) => (
                    <option key={employee.id} value={employee.name}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="attendancereports-grid-item">
              <h6>Export Attendance Report As:</h6>
            </div>
            <div className="attendancereports-grid-item">
              <label htmlFor="exportFormat" className="attendancereports-label">Export Format</label>
              <select
                id="exportFormat"
                className="attendancereports-select"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="attendancereports-grid-item">
              <button type="button" className="attendancereports-button" onClick={handleGenerateReport}>
                Generate Attendance Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceReports;