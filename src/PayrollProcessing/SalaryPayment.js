import React, { useState } from 'react';
import './SalaryPayment.css';
import salaryData from './SalaryPaymentsData';

const SalaryPayment = () => {
  const [activeTab, setActiveTab] = useState('salary');
  const [activeMode, setActiveMode] = useState('bulk');
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('Jan');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleModeClick = (mode) => {
    setActiveMode(mode);
  };

  return (
    <div className="salary-payment-root">
      <h1 className="salary-payment-title">Salary Payment</h1>
      <p className="salary-payment-subtitle">Search employee to get payroll</p>
      <div className="salary-payment-tabs">
        <button
          className={`salary-payment-tab ${activeTab === 'salary' ? 'active' : ''}`}
          onClick={() => handleTabClick('salary')}
        >
          Salary
        </button>
        <button
          className={`salary-payment-tab ${activeTab === 'incentives' ? 'active' : ''}`}
          onClick={() => handleTabClick('incentives')}
        >
          Incentives
        </button>
      </div>
      <div className="salary-payment-modes">
        <button
          className={`salary-payment-mode ${activeMode === 'bulk' ? 'active' : ''}`}
          onClick={() => handleModeClick('bulk')}
        >
          Bulk
        </button>
        <button
          className={`salary-payment-mode ${activeMode === 'single' ? 'active' : ''}`}
          onClick={() => handleModeClick('single')}
        >
          Single
        </button>
      </div>
      <hr className="salary-payment-divider" />
      {activeMode === 'bulk' && (
        <div className="salary-payment-bulk">
          <div className="salary-payment-search">
            <i className="fas fa-search salary-payment-search-icon"></i>
            <input
              type="text"
              className="salary-payment-search-input"
              placeholder="Search"
            />
          </div>
          <div className="salary-payment-filters">
            <div className="salary-payment-select-container">
              <select
                className="salary-payment-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {Array.from({ length: 11 }, (_, i) => 2015 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="salary-payment-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button className="salary-payment-proceed-button">Proceed</button>
          </div>
          <div className="salary-payment-table-container">
            <div className="salary-payment-table-header">
              <h2 className="salary-payment-table-title">Bulk Salary Payment</h2>
              <button className="salary-payment-download-button">Download</button>
            </div>
            <div className="salary-payment-table-wrapper">
              <table className="salary-payment-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Days in Month</th>
                    <th>Paid Days</th>
                    <th>Fixed GROSS Salary (NEW)</th>
                    <th>Basic + DA</th>
                    <th>HRA</th>
                    <th>Conveyance</th>
                    <th>Medical Allow</th>
                    <th>Other ALLOWANCE</th>
                    <th>Gross</th>
                    <th>Earn Basic</th>
                    <th>Earn HRA</th>
                    <th>Earn Conveyance</th>
                    <th>Earn Medical Allow</th>
                    <th>Incentive</th>
                    <th>Earn OTHER Allo</th>
                    <th>Earn Gross</th>
                    <th>PF WAGES</th>
                    <th>PF</th>
                    <th>ESIC</th>
                    <th>PT</th>
                    <th>LWF</th>
                    <th>Advance</th>
                    <th>Total Deduction</th>
                    <th>Net Payable</th>
                    <th>Graduity</th>
                    <th>EMPYER PF</th>
                    <th>EMPYER ESIC</th>
                    <th>Bonus</th>
                    <th>EMPLOYER LWF</th>
                    <th>CTC</th>
                    <th>Remark</th>
                    <th>Remark2</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.daysInMonth}</td>
                      <td>{row.paidDays}</td>
                      <td>{row.fixedGrossSalary}</td>
                      <td>{row.basicDA}</td>
                      <td>{row.hra}</td>
                      <td>{row.conveyance}</td>
                      <td>{row.medicalAllow}</td>
                      <td>{row.otherAllowance}</td>
                      <td>{row.gross}</td>
                      <td>{row.earnBasic}</td>
                      <td>{row.earnHRA}</td>
                      <td>{row.earnConveyance}</td>
                      <td>{row.earnMedicalAllow}</td>
                      <td>{row.incentive}</td>
                      <td>{row.earnOtherAllowance}</td>
                      <td>{row.earnGross}</td>
                      <td>{row.pfWages}</td>
                      <td>{row.pf}</td>
                      <td>{row.esic}</td>
                      <td>{row.pt}</td>
                      <td>{row.lwf}</td>
                      <td>{row.advance}</td>
                      <td>{row.totalDeduction}</td>
                      <td>{row.netPayable}</td>
                      <td>{row.graduity}</td>
                      <td>{row.employerPF}</td>
                      <td>{row.employerESIC}</td>
                      <td>{row.bonus}</td>
                      <td>{row.employerLWF}</td>
                      <td>{row.ctc}</td>
                      <td>{row.remark}</td>
                      <td>{row.remark2}</td>
                      <td className="salary-payment-action">
                        <i className="fas fa-edit edit-icon"></i>
                        <i className="fas fa-trash delete-icon"></i>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryPayment;