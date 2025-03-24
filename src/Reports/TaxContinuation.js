import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaxContinuation.css';

const TaxContinuation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [year, setYear] = useState('Year');
  const [month, setMonth] = useState('Month');
  const [schema, setSchema] = useState('old'); // Default schema is "old"

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

  const handleSchemaChange = (schemaType) => {
    setSchema(schemaType);
  };

  return (
    <div className="tax-continuation-root">
      <h1 className="tax-continuation-title">Tax Continuation</h1>

      {/* Search Bar */}
      <div className="tax-continuation-search">
        <input
          type="text"
          className="tax-continuation-search-input"
          placeholder="Search Employee"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredEmployees.length > 0 && (
          <ul className="tax-continuation-dropdown">
            {filteredEmployees.map((employee) => (
              <li
                key={employee.id}
                className="tax-continuation-dropdown-item"
                onClick={() => handleEmployeeSelect(employee)}
              >
                {employee.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Schema Buttons */}
      <div className="tax-continuation-buttons">
        <button
          className={`schema-button ${schema === 'old' ? 'active' : ''}`}
          onClick={() => handleSchemaChange('old')}
        >
          Old Schema
        </button>
        <button
          className={`schema-button ${schema === 'new' ? 'active' : ''}`}
          onClick={() => handleSchemaChange('new')}
        >
          New Schema
        </button>
      </div>

      {/* Year and Month Dropdowns */}
      <div className="tax-continuation-filters">
        <select
          className="tax-continuation-select"
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
          className="tax-continuation-select"
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

      {/* Table */}
      <div className="tax-continuation-table-container">
        <table className="tax-continuation-table">
          <thead>
            <tr>
              <th>Particulars</th>
              {employees.map((employee) => (
                <th key={employee.id}>{employee.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAN Number</td>
              {employees.map((employee) => (
                <td key={employee.id}>{employee.pan_number || 'XXXX'}</td>
              ))}
            </tr>
            <tr>
              <td>Date of Joining</td>
              {employees.map((employee) => (
                <td key={employee.id}>{employee.date_of_joining || 'XXXX'}</td>
              ))}
            </tr>
            <tr>
              <td>Field 2</td>
              {employees.map((employee) => (
                <td key={employee.id}>XXXX</td>
              ))}
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxContinuation;