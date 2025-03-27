import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Import the library
import './StatutoryCompliance.css';
import PaySlip from './PaySlip';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const StatutoryCompliance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('Jan');
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
    setSelectedEmployee(employee);
    setSearchTerm(employee.name);
    setFilteredEmployees([]);
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
    alert('Save functionality is not implemented yet.');
    // Add logic to save the current state or data
  };

  const handleDownload = () => {
    if (exportFormat === 'pdf') {
      // Dynamically create a container for the Pay Slip
      const tempElement = document.createElement('div');
      document.body.appendChild(tempElement);
  
      // Render the Pay Slip component into the temporary container
      ReactDOM.render(
        <BrowserRouter>
          <PaySlip employee={selectedEmployee} year={year} month={month} />
        </BrowserRouter>,
        tempElement
      );
  
      // Configure the PDF options
      const options = {
        margin: 1,
        filename: `PaySlip_${selectedEmployee?.name || 'Employee'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
  
      // Generate and download the PDF
      html2pdf()
        .set(options)
        .from(tempElement)
        .save()
        .then(() => {
          // Clean up the temporary container after the PDF is generated
          ReactDOM.unmountComponentAtNode(tempElement);
          document.body.removeChild(tempElement);
        });
    } else {
      alert('Only PDF export is supported for now.');
    }
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
          TDS Report
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
  );
};

export default StatutoryCompliance;