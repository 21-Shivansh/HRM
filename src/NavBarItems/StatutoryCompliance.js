import React, { useState } from 'react';
import './StatutoryCompliance.css';

const StatutoryCompliance = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [reportTypes, setReportTypes] = useState([]);
  const [exportFormat, setExportFormat] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(new Array(26), (val, index) => index + 2000);

  const reportOptions = [
    'PF Report', 'ESI Report', 'PT Report', 'TDS Report', 'LWF Report', 
    'Gratuity and Pension Report', 'Minimum Wages Report', 
    'Shops and Establishment Act Compliance', 'Maternity Benefit Compliance', 
    'Equal Pay and Anti Discrimination Compliance'
  ];

  const handleGenerateReport = () => {
    // Logic to generate compliance report
    console.log('Generating compliance report...');
  };

  const handleReportTypeChange = (event) => {
    const value = event.target.value;
    setReportTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  return (
    <div className="statutorycompliance-root">
      <div className="statutorycompliance-paper">
        <h4 className="statutorycompliance-title">Statutory Compliance</h4>
        <form noValidate autoComplete="off">
          <div className="statutorycompliance-grid">
            <div className="statutorycompliance-grid-item">
              <h6>Select Compliance Period</h6>
            </div>
            <div className="statutorycompliance-grid-item">
              <label htmlFor="month" className="statutorycompliance-label">Month</label>
              <select
                id="month"
                className="statutorycompliance-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="statutorycompliance-grid-item">
              <label htmlFor="year" className="statutorycompliance-label">Year</label>
              <select
                id="year"
                className="statutorycompliance-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="statutorycompliance-grid-item">
              <h6>Select Compliance Report Type</h6>
            </div>
            <div className="statutorycompliance-grid-item">
              <div className="statutorycompliance-checkbox-group">
                {reportOptions.map((report) => (
                  <label key={report} className="statutorycompliance-checkbox-label">
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
            <div className="statutorycompliance-grid-item">
              <h6>Export Compliance Report As:</h6>
            </div>
            <div className="statutorycompliance-grid-item">
              <label htmlFor="exportFormat" className="statutorycompliance-label">Export Format</label>
              <select
                id="exportFormat"
                className="statutorycompliance-select"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="statutorycompliance-grid-item">
              <button type="button" className="statutorycompliance-button" onClick={handleGenerateReport}>
                Generate Compliance Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatutoryCompliance;