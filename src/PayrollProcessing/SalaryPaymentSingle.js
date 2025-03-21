import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas'; // Importing html2canvas
import { FaDownload, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import "./SalaryPaymentSingle.css";

const SalaryPaymentSingle = ({ employee }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [calculatedData, setCalculatedData] = useState(null);

  const handleProceedClick = () => {
    setPopupVisible(true);
  };

  useEffect(() => {
    if (employee) {
      
      console.log("Employee Data:", employee);
      // Perform calculations based on the formulas
      const daysInMonth = 31;
      const paidDays = employee.paidDays || 31;
      const grossSalary = employee.salary || 0;

      // Calculations
      const basicDA = Math.round(grossSalary * 0.5);
      const hra = Math.round(basicDA * 0.5);
      const conveyance = 1200;
      const medicalAllow = 1000;
      const otherAllowance = grossSalary - hra - basicDA - conveyance - medicalAllow;
      const gross = basicDA + hra + conveyance + medicalAllow + otherAllowance;
      const earnBasic = Math.round((basicDA / daysInMonth) * paidDays);
      const earnHRA = Math.round((hra / daysInMonth) * paidDays);
      const earnConveyance = Math.round((conveyance / daysInMonth) * paidDays);
      const earnMedicalAllow = Math.round((medicalAllow / daysInMonth) * paidDays);
      const earnOtherAllo = Math.round((otherAllowance / daysInMonth) * paidDays);
      const earnGross = earnBasic + earnHRA + earnConveyance + earnMedicalAllow + earnOtherAllo;
      const pfWages = earnGross - earnHRA;
      const pf = Math.round(pfWages >= 15000 ? 1800 : pfWages * 0.12);
      const esic = Math.ceil(gross >= 21001 ? 0 : earnGross * 0.0075);
      const pt = 200;
      const lwf = 25;
      const totalDeduction = pf + esic + pt + lwf;
      const netPayable = earnGross - totalDeduction;

      // Set the calculated data
      setCalculatedData({
        basicDA,
        hra,
        conveyance,
        medicalAllow,
        otherAllowance,
        gross,
        earnBasic,
        earnHRA,
        earnConveyance,
        earnMedicalAllow,
        earnOtherAllo,
        earnGross,
        pf,
        esic,
        pt,
        lwf,
        totalDeduction,
        netPayable,
      });
    }
  }, [employee]);

  return (
    <div className="payroll-card">
      <div className="payroll-header">
      <div className="payroll-info">
          <h2>{employee.name}</h2>
          <div className="payroll-info-row">
            {/* First Row */}
            <div className="payroll-info-column">
              <p>Employee Name: {employee.name || "N/A"}</p>
              <p>Designation: {employee.designation || "N/A"}</p>
              <p>Employee ID: {employee.id}</p>
              <p>Date of Joining: {employee.dateOfJoining || "N/A"}</p>
              <p>Pay Period: {employee.payPeriod || "N/A"}</p>
              <p>Pay Date: {employee.payDate || "N/A"}</p>
              <p>PF A/C Number: {employee.pfAccountNumber || "N/A"}</p>
            </div>

            {/* Second Row */}
            <div className="payroll-info-column">
              <p>Bank A/C Name: {employee.bankAccountName || "N/A"}</p>
              <p>Bank Name: {employee.bankName || "N/A"}</p>
              <p>Bank A/C Number: {employee.bankAccountNumber || "N/A"}</p>
              <p>PR A/C Number: {employee.prAccountNumber || "N/A"}</p>
              <p>ESI Number: {employee.esiNumber || "N/A"}</p>
              <p>UAN Number: {employee.uanNumber || "N/A"}</p>
              <p>PAN Number: {employee.panNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="net-pay">
          <h3>{calculatedData ? calculatedData.netPayable.toFixed(2) : "0.00"}</h3>
          <p>Employee Net Pay</p>
          <p>Paid Days: {employee.paidDays || 0}</p>
          <p>Leave: {employee.leaveDays || 0}</p>
        </div>
      </div>

      <button onClick={handleProceedClick}> Proceed </button>
      <button onClick={() => {
        html2canvas(document.querySelector(".payroll-card")).then(canvas => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL("image/png");
          link.download = "payroll_card_snapshot.png";
          link.click();
        });
      }}>
        <FaDownload /> Download
      </button>
      <button onClick={() => {/* Functionality to edit */}}>
        <FaEdit /> Edit
      </button>
      <button onClick={() => {/* Functionality to delete */}} style={{ color: 'red' }}>
        <FaTrash /> Delete
      </button>

      

      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Enter Payment Information</h2>
            <form>
              <label>
                Paid on Date:
                <input type="date" required />
              </label>
              <label>
                Amount:
                <input type="number" required />
              </label>
              <label>
                UTR:
                <input type="text" required />
              </label>
              <label>
                Bank Name:
                <input type="text" required />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setPopupVisible(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      <div className="salary-section">
        <div className="salary-breakdown-container">
          <div className="salary-breakdown">
            {calculatedData && (
            <table>
              <thead>
                <tr>
                  <th>Earnings</th>
                  <th>Amount</th>
                  <th>Deductions</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic</td>
                  <td>{calculatedData.earnBasic}</td>
                  <td>Leaves</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>Conveyance Allowance</td>
                  <td>{calculatedData.earnConveyance}</td>
                  <td>Profession Tax</td>
                  <td>{calculatedData.pt}</td>
                </tr>
                <tr>
                  <td>House Rent Allowance</td>
                  <td>379715</td>
                  <td>PF 12%</td>
                  <td>23247</td>
                </tr>
                <tr>
                  <td>Medical</td>
                  <td>{calculatedData.earnMedicalAllow}</td>
                  <td>EPF 3.67%</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>Incentives</td>
                  <td>0</td>
                  <td>EPS 8.33%</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>Bonus</td>
                  <td>XXX</td>
                  <td>ESIC 0.75%</td>
                  <td>{calculatedData.esic}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>ESIC 3.25%</td>
                  <td>{calculatedData.esic}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>TDS on Salary</td>
                  <td>XXX</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Gross Earnings</strong></td>
                  <td><strong>{calculatedData.earnGross}</strong></td>
                  <td><strong>Total Deduction</strong></td>
                  <td><strong>{calculatedData.totalDeduction}</strong></td>
                </tr>
              </tfoot>
            </table>
            )}
          </div>
        </div>

        <div className="total-net-payable">
          <span>Total Net Payable</span>
          <strong>{calculatedData ? calculatedData.netPayable.toFixed(2) : "0.00"}</strong>
        </div>
      </div>
    </div>
  );
};

export default SalaryPaymentSingle;
