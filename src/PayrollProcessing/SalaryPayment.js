import React, { useState } from 'react';
import './SalaryPayment.css';
import Payroll, { payrolls } from './SalaryPaymentsData';

const SalaryPayment = () => {
  const [activeTab, setActiveTab] = useState('salary');
  const [activeMode, setActiveMode] = useState('bulk');
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('Jan');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedRows, setSelectedRows] = useState([]);
  const [payrollData, setPayrollData] = useState(() => payrolls.map((payroll, index) => ({
    id: index + 1,
    ...payroll,
    salaryToBePaid: false, // Add this field to track checkbox state
  })));

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleModeClick = (mode) => {
    setActiveMode(mode);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleModalSubmit = () => {
    const updatedData = payrollData.map((row) =>
      row.salaryToBePaid ? { ...row, status: 'Paid' } : row
    );
    setPayrollData(updatedData); // Update the status of selected rows to "Paid"
    setIsModalOpen(false); // Close the modal
  };

  const handleCheckboxChange = (id) => {
    const updatedData = payrollData.map((row) =>
      row.id === id ? { ...row, salaryToBePaid: !row.salaryToBePaid } : row
    );

    // Update selected rows
    const updatedSelectedRows = updatedData.filter((row) => row.salaryToBePaid);
    setPayrollData(updatedData);
    setSelectedRows(updatedSelectedRows);
  };

  const handleProceedClick = () => {
    /*
    if (selectedRows.length === 0) {
      alert('Please select at least one row to proceed.');
      return;
    }
      */
    setIsModalOpen(true); // Open the modal
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
            <button
              className="salary-payment-proceed-button"
              onClick={handleProceedClick} 
            >
              Proceed
            </button>
          </div>
          <div className="salary-payment-table-container">
            <div className="salary-payment-table-header">
              <h2 className="salary-payment-table-title">Bulk Salary Payment</h2>
              <button className="salary-payment-download-button">Download</button>
            </div>
            <div className="salary-payment-table-wrapper">
            <Payroll
              data={payrollData}
              onCheckboxChange={handleCheckboxChange}
            />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="salary-payment-modal">
          <div className="salary-payment-modal-content">
            {/* Close button on the top-right */}
            <button className="salary-payment-modal-close-top" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="salary-payment-modal-grid">
              <div className="salary-payment-modal-row">
                <label>Paid on Date</label>
                <input type="date" className="salary-payment-modal-input" />
              </div>
              <div className="salary-payment-modal-row">
                <label>UTR</label>
                <input type="text" className="salary-payment-modal-input" placeholder="Enter UTR" />
              </div>
              <div className="salary-payment-modal-row">
                <label>Amount</label>
                <input type="number" className="salary-payment-modal-input" placeholder="Enter Amount" />
              </div>
              <div className="salary-payment-modal-row">
                <label>Bank Name</label>
                <input type="text" className="salary-payment-modal-input" placeholder="Enter Bank Name" />
              </div>
            </div>
            <div className="salary-payment-modal-actions">
            <button className="salary-payment-modal-submit" onClick={handleModalSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryPayment;