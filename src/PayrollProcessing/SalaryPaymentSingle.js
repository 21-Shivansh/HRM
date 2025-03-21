import React, { useState } from "react";
import html2canvas from 'html2canvas'; // Importing html2canvas
import { FaDownload, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import "./SalaryPaymentSingle.css";


const SalaryPaymentSingle = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleProceedClick = () => {
    setPopupVisible(true);
  };
  return (
    <div className="payroll-card">
      <div className="payroll-header">
        <div className="payroll-info">
          <h2>Isha. G. Gokhale</h2>
          <p>Employee Name: Bank A/C Name</p>
          <p>Designation: Bank Name</p>
          <p>Employee ID: Bank A/C Number</p>
          <p>Date of Joining: -</p>
          <p>Pay Period: -</p>
          <p>Pay Date: -</p>
          <p>PF A/C Number: -</p>
        </div>

        <div className="net-pay">
          <h3>20,000.00</h3>
          <p>Employee Net Pay</p>
          <p>Paid Days: 30</p>
          <p>Leave: 0</p>
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
                  <td>780623</td>
                  <td>Leaves</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>Conveyance Allowance</td>
                  <td>25161</td>
                  <td>Profession Tax</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>House Rent Allowance</td>
                  <td>379715</td>
                  <td>PF 12%</td>
                  <td>23247</td>
                </tr>
                <tr>
                  <td>Medical</td>
                  <td>20968</td>
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
                  <td>XXX</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>ESIC 3.25%</td>
                  <td>XXX</td>
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
                  <td><strong>1534747</strong></td>
                  <td><strong>Total Deduction</strong></td>
                  <td><strong>XXX</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="total-net-payable">
          <span>Total Net Payable</span>
          <strong>20,000.00</strong>
        </div>
      </div>
    </div>
  );
};

export default SalaryPaymentSingle;
