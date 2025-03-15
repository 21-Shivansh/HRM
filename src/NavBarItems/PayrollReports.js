import React, { useState } from 'react';
import './PayrollReports.css';

const reportOptions = [
  'Salary Register', 'Payslip Reports', 'Attendance and Overtime Report', 
  'Bonus and Incentive Report', 'Payroll Summary Report', 
  'Tax Deduction Report (TDS, EPF, ESI, PT)', 'Loan and Advance Report', 
  'Reimbursement Report', 'Bank Advice Report', 'Gratuity and Pension Report'
];

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

const PayrollReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportTypes, setReportTypes] = useState([]);
  const [employeeSelection, setEmployeeSelection] = useState('all');
  const [specificEmployee, setSpecificEmployee] = useState('');
  const [exportFormat, setExportFormat] = useState('');

  const handleGenerateReport = () => {
    // Logic to generate report
    console.log('Generating report...');
  };

  const handleReportTypeChange = (event) => {
    const value = event.target.value;
    setReportTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  return (
    <div className="payrollreports-root">
      <div className="payrollreports-paper">
        <h4 className="payrollreports-title">Payroll Reports</h4>
        <form noValidate autoComplete="off">
          <div className="payrollreports-grid">
            <div className="payrollreports-grid-item">
              <h6>Select Date Range</h6>
            </div>
            <div className="payrollreports-grid-item">
              <label htmlFor="startDate" className="payrollreports-label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="payrollreports-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="payrollreports-grid-item">
              <label htmlFor="endDate" className="payrollreports-label">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="payrollreports-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="payrollreports-grid-item">
              <h6>Payroll Report Type</h6>
            </div>
            <div className="payrollreports-grid-item">
              <div className="payrollreports-checkbox-group">
                {reportOptions.map((report) => (
                  <label key={report} className="payrollreports-checkbox-label">
                    <input
                      type="checkbox"
                      checked={reportTypes.includes(report)}
                      onChange={handleReportTypeChange}
                      value={report}
                    />
                    {report}
                  </label>
                ))}
              </div>
            </div>
            <div className="payrollreports-grid-item">
              <h6>Employee Selection</h6>
            </div>
            <div className="payrollreports-grid-item">
              <div className="payrollreports-radio-group">
                <label className="payrollreports-radio-label">
                  <input
                    type="radio"
                    value="all"
                    checked={employeeSelection === 'all'}
                    onChange={(event) => setEmployeeSelection(event.target.value)}
                  />
                  All Employees
                </label>
                <label className="payrollreports-radio-label">
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
              <div className="payrollreports-grid-item">
                <label htmlFor="specificEmployee" className="payrollreports-label">Specific Employee</label>
                <select
                  id="specificEmployee"
                  className="payrollreports-select"
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
            <div className="payrollreports-grid-item">
              <h6>Export Report As:</h6>
            </div>
            <div className="payrollreports-grid-item">
              <label htmlFor="exportFormat" className="payrollreports-label">Export Format</label>
              <select
                id="exportFormat"
                className="payrollreports-select"
                value={exportFormat}
                onChange={(event) => setExportFormat(event.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="payrollreports-grid-item">
              <button type="button" className="payrollreports-button" onClick={handleGenerateReport}>
                Generate Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollReports;