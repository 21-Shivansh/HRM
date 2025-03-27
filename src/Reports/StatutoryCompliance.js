import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatutoryCompliance.css';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

const StatutoryCompliance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [year, setYear] = useState('Year');
  const [month, setMonth] = useState('Month');
  const [reportTypes, setReportTypes] = useState({
    pf: false,
    esi: false,
    pt: false,
    tds: false,
    gratuity: false,
  });
  const [exportFormat, setExportFormat] = useState('pdf'); // Default export format

  useEffect(() => {
    // Fetch employee data from the backend
    axios
      .get('http://localhost:5000/api/employees')
      .then((response) => {
        setEmployees(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredEmployees([]);
      return;
    }

    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleEmployeeSelect = (employee) => {
    setSearchTerm(employee.name);
    setFilteredEmployees([]);
  
    const payrollData = processPayrollData(employee);
  
    setSelectedEmployee({ ...employee, ...payrollData });
  };

  const handleReportTypeChange = (type) => {
    setReportTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleExport = () => {
    alert(`Exporting as ${exportFormat.toUpperCase()}`);
    // Add logic for exporting data
  };

  const handleSave = () => {
    alert('Saving the selected reports');
    // Add logic for saving data
  };

  const handleDownload = () => {
    if (!selectedEmployee) {
      alert('Please select an employee before downloading.');
      return;
    }

    const isAnyReportTypeSelected = Object.values(reportTypes).some((isSelected) => isSelected);
    if (!isAnyReportTypeSelected) {
      alert('Please select at least one report type (e.g., PF, ESI, PT, TDS, Gratuity).');
      return;
    }

    if (exportFormat === 'pdf') {
      // PDF Download Logic
      const previewElement = document.querySelector('.statutory-compliance-preview');
      if (!previewElement) {
        alert('Preview section not found!');
        return;
      }
  
      const originalStyle = previewElement.getAttribute('style'); // Save the original style
      previewElement.setAttribute(
        'style',
        `${originalStyle || ''}; width: 100%; max-width: 100%;`
      );
  
      const options = {
        margin: 1,
        filename: `Statutory_Compliance_${selectedEmployee.name || 'Employee'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
  
      html2pdf()
        .set(options)
        .from(previewElement)
        .save()
        .then(() => {
          if (originalStyle) {
            previewElement.setAttribute('style', originalStyle);
          } else {
            previewElement.removeAttribute('style');
        }
      });
    } else if (exportFormat === 'excel') {
      // Excel Download Logic
      const data = [];

      // Add header row
      data.push(['Employee Name', 'Year', 'Month', 'PF', 'ESI', 'PT', 'TDS', 'Gratuity']);

      // Add data row
      data.push([
        selectedEmployee?.name || 'N/A',
        year || 'N/A',
        month || 'N/A',
        reportTypes.pf ? selectedEmployee?.pf || 'N/A' : 'N/A',
        reportTypes.esi ? selectedEmployee?.esi || 'N/A' : 'N/A',
        reportTypes.pt ? selectedEmployee?.pt || 'N/A' : 'N/A',
        reportTypes.tds ? selectedEmployee?.tds || 'N/A' : 'N/A',
        reportTypes.gratuity ? selectedEmployee?.gratuity || 'N/A' : 'N/A',
      ]);

      // Create a worksheet and workbook
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Statutory Compliance');

      // Write the Excel file and trigger download
      XLSX.writeFile(workbook, `Statutory_Compliance_${selectedEmployee.name || 'Employee'}.xlsx`);
    }
  };

  const processPayrollData = (employee) => {
    if (!employee) return null;
  
    const daysInMonth = 31;
    const paidDays = 31;
    const basicDA = Math.round(employee.salary * 0.5);
    const hra = Math.round(basicDA * 0.5);
    const conveyance = 1200;
    const medicalAllow = 1000;
    const otherAllowance = employee.salary - hra - basicDA - conveyance - medicalAllow;
    const gross = basicDA + hra + conveyance + medicalAllow + otherAllowance;
    const earnBasic = Math.round((basicDA / daysInMonth) * paidDays);
    const earnHRA = Math.round((hra / daysInMonth) * paidDays);
    const earnConveyance = Math.round((conveyance / daysInMonth) * paidDays);
    const earnMedicalAllow = Math.round((medicalAllow / daysInMonth) * paidDays);
    const earnOtherAllo = Math.round((otherAllowance / daysInMonth) * paidDays);
    const earnGross = earnBasic + earnHRA + earnConveyance + earnMedicalAllow + earnOtherAllo;
    const pfWages = earnGross - earnHRA;
  
    // Calculate the required fields
    const pf = Math.round(pfWages >= 15000 ? 1800 : pfWages * 0.12); // PF
    const esic = Math.ceil(gross >= 21001 ? 0 : earnGross * 0.0075); // ESI
    const pt = 200; // PT
    const tds = 0; // Assuming TDS is not calculated here, set to 0 or add logic if needed
    const gratuity = Math.round(earnBasic * 0.0481) + 1; // Gratuity
  
    return { pf, esic, pt, tds, gratuity };
  };

  return (
    <div className="statutory-compliance-root">
      <h1 className="statutory-compliance-title">Statutory Compliance</h1>

      {/* Search Bar */}
      <div className="statutory-compliance-search">
            <input
              type="text"
              className="statutory-compliance-search-input"
              placeholder="Search Employee"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {filteredEmployees.length > 0 && (
              <ul className="statutory-compliance-dropdown">
                {filteredEmployees.map((employee) => (
                  <li
                    key={employee.id}
                    className="statutory-compliance-dropdown-item"
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    {employee.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
  
      <div className="statutory-compliance-content">
        {/* Left Section: Existing Content */}
        <div className="statutory-compliance-left">
          
  
          {/* Year and Month Dropdowns */}
          <div className="statutory-compliance-filters">
            <select
              className="statutory-compliance-select"
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
              className="statutory-compliance-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                (month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
              )}
            </select>
          </div>
  
          {/* Employee Name and Report Type */}
          {selectedEmployee && (
            <div className="statutory-compliance-employee">
              <h2>{selectedEmployee.name}</h2>
              <p>Select: Statutory Compliance Report Type</p>
            </div>
          )}
  
          {/* Checkboxes for Report Types */}
          <div className="statutory-compliance-checkboxes">
            <label>
              <input
                type="checkbox"
                checked={reportTypes.pf}
                onChange={() => handleReportTypeChange('pf')}
              />
              PF Report
            </label>
            <label>
              <input
                type="checkbox"
                checked={reportTypes.esi}
                onChange={() => handleReportTypeChange('esi')}
              />
              ESI Report
            </label>
            <label>
              <input
                type="checkbox"
                checked={reportTypes.pt}
                onChange={() => handleReportTypeChange('pt')}
              />
              PT Report
            </label>
            <label>
              <input
                type="checkbox"
                checked={reportTypes.tds}
                onChange={() => handleReportTypeChange('tds')}
              />
              Annual CTC Report
            </label>
            <label>
              <input
                type="checkbox"
                checked={reportTypes.gratuity}
                onChange={() => handleReportTypeChange('gratuity')}
              />
              Gratuity Report
            </label>
          </div>
  
          {/* Buttons */}
          <div className="statutory-compliance-buttons">
            <button className="purple-button" onClick={handleExport}>
              Export As
            </button>
            <button className="white-button" onClick={handleSave}>
              Save
            </button>
          </div>
  
          {/* Export Format Checkboxes */}
          <div className="statutory-compliance-export-format">
            <label>
              <input
                type="radio"
                name="exportFormat"
                value="pdf"
                checked={exportFormat === 'pdf'}
                onChange={() => setExportFormat('pdf')}
              />
              As PDF
            </label>
            <label>
              <input
                type="radio"
                name="exportFormat"
                value="excel"
                checked={exportFormat === 'excel'}
                onChange={() => setExportFormat('excel')}
              />
              As Excel
            </label>
          </div>
  
          {/* Download Button */}
          <button className="purple-button" onClick={handleDownload}>
            Download
          </button>
        </div>
  
        {/* Right Section: Preview */}
        <div className="statutory-compliance-preview">
          <h2>Statutory Compliance</h2>
          <p><strong>Employee Name:</strong> {selectedEmployee?.name || '_________'}</p>
          <p><strong>Year:</strong> {year || '_________'}</p>
          <p><strong>Month:</strong> {month || '_________'}</p>
          <hr />
          <h3>Selected Report(s)</h3>

          {exportFormat === 'pdf' ? (
            // PDF Preview
            <ul>
              {reportTypes.pf && <li><strong>PF:</strong> {selectedEmployee?.pf || 'N/A'}</li>}
              {reportTypes.esi && <li><strong>ESI:</strong> {selectedEmployee?.esi || 'N/A'}</li>}
              {reportTypes.pt && <li><strong>PT:</strong> {selectedEmployee?.pt || 'N/A'}</li>}
              {reportTypes.tds && <li><strong>TDS:</strong> {selectedEmployee?.tds || 'N/A'}</li>}
              {reportTypes.gratuity && <li><strong>Gratuity:</strong> {selectedEmployee?.gratuity || 'N/A'}</li>}
            </ul>
          ) : (
            // Excel Table Preview
            <table className="statutory-compliance-table">
              <thead>
                <tr>
                  <th>Report Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {reportTypes.pf && (
                  <tr>
                    <td>PF</td>
                    <td>{selectedEmployee?.pf || 'N/A'}</td>
                  </tr>
                )}
                {reportTypes.esi && (
                  <tr>
                    <td>ESI</td>
                    <td>{selectedEmployee?.esi || 'N/A'}</td>
                  </tr>
                )}
                {reportTypes.pt && (
                  <tr>
                    <td>PT</td>
                    <td>{selectedEmployee?.pt || 'N/A'}</td>
                  </tr>
                )}
                {reportTypes.tds && (
                  <tr>
                    <td>TDS</td>
                    <td>{selectedEmployee?.tds || 'N/A'}</td>
                  </tr>
                )}
                {reportTypes.gratuity && (
                  <tr>
                    <td>Gratuity</td>
                    <td>{selectedEmployee?.gratuity || 'N/A'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatutoryCompliance;