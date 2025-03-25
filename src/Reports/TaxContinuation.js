import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaxContinuation.css';

const TaxContinuation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [year, setYear] = useState('Year');
  const [month, setMonth] = useState('Month');

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

  const calculateRowData = (employee) => {
    const salary = employee.salary || 0;
    const pan = employee.pan_number || '-';
    const bonus = 0;
    const stdDeduction = salary > 0 ? 50000 : 0;
    const professionTax = -2500;

    // HRA Calculation
    const basic50 = salary * 0.5;
    const hra50 = basic50;
    const rentPaid = 0;
    const rentPaidAdjusted = rentPaid > 0 ? rentPaid - (basic50 * 0.1) : 0;
    const hraDeduction = Math.min(basic50 / 2, hra50, rentPaidAdjusted);

    // Interest on Housing Loan
    const interestOnHousingLoan = 0;
    const deduction = -Math.min(interestOnHousingLoan - 200000, 0);

    // Chapter VIA Deductions
    const lic80c = 150000;
    const elss80c = 50000;
    const ppf80c = 0;
    const deduction80c = Math.min(lic80c + elss80c + ppf80c, 150000);

    const mediclaim80d = 0;
    const parentsMediclaim = 0;
    const deduction80d = Math.min(mediclaim80d, 25000);

    const totalChpViaDeduction = -deduction80c - deduction80d;

    // Net Income
    const netIncome =
      salary +
      bonus +
      stdDeduction +
      professionTax +
      deduction +
      hraDeduction +
      totalChpViaDeduction;

    // Tax Calculation
    const tax =
      netIncome > 1000000
        ? (netIncome - 1000000) * 0.3 + 112500
        : netIncome > 500000
        ? (netIncome - 500000) * 0.2 + 12500
        : netIncome > 250000
        ? (netIncome - 250000) * 0.05
        : 0;

    // Rebate u/s 87A
    const rebate87A = netIncome <= 500000 ? -Math.min(tax, 12500) : 0;

    // Net Tax + Cess
    const netTaxCess = tax + rebate87A + (tax + rebate87A > 0 ? (tax + rebate87A) * 0.04 : 0);

    // TDS p.m. plus Bonus
    const tdsPmPlusBonus = netTaxCess / 12;

    return {
      pan,
      salary,
      bonus,
      stdDeduction,
      professionTax,
      basic50,
      hra50,
      rentPaid,
      rentPaidAdjusted,
      hraDeduction,
      interestOnHousingLoan,
      deduction,
      lic80c,
      elss80c,
      ppf80c,
      deduction80c,
      mediclaim80d,
      parentsMediclaim,
      deduction80d,
      totalChpViaDeduction,
      netIncome,
      tax,
      rebate87A,
      netTaxCess,
      tdsPmPlusBonus,
    };
  };

  const particulars = [
    { label: 'PAN Number', key: 'pan' },
    { label: 'Salary (April 2023 - March 2024)', key: 'salary' },
    { label: 'Bonus/Incentives', key: 'bonus' },
    { label: 'Std deduction', key: 'stdDeduction' },
    { label: 'Profession Tax', key: 'professionTax' },
    { label: 'Basic (50%)', key: 'basic50' },
    { label: 'HRA (50%)', key: 'hra50' },
    { label: 'Rent paid', key: 'rentPaid' },
    { label: '50% of basic', key: 'rentPaidAdjusted' },
    { label: 'Actual HRA', key: 'hra50' },
    { label: 'Rent paid - 10% basic', key: 'rentPaidAdjusted' },
    { label: 'HRA deduction', key: 'hraDeduction' },
    { label: 'Interest on Housing Loan', key: 'interestOnHousingLoan' },
    { label: 'Deduction', key: 'deduction' },
    { label: 'LIC 80C', key: 'lic80c' },
    { label: 'ELSS 80C', key: 'elss80c' },
    { label: 'PPF 80C', key: 'ppf80c' },
    { label: '80C deduction', key: 'deduction80c' },
    { label: 'Mediclaim 80D', key: 'mediclaim80d' },
    { label: 'Parents Mediclaim', key: 'parentsMediclaim' },
    { label: '80D deduction', key: 'deduction80d' },
    { label: 'Total Chp VIA deduction', key: 'totalChpViaDeduction' },
    { label: 'Net Income', key: 'netIncome' },
    { label: 'Tax', key: 'tax' },
    { label: 'Less: Rebate u/s 87A', key: 'rebate87A' },
    { label: 'Net Tax + cess', key: 'netTaxCess' },
    { label: 'TDS p.m. plus Bonus', key: 'tdsPmPlusBonus' },
  ];

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
                onClick={() => setSearchTerm(employee.name)}
              >
                {employee.name}
              </li>
            ))}
          </ul>
        )}
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
            {particulars.map(({ label, key }, index) => (
              <tr key={index}>
                <td>{label}</td>
                {employees.map((employee) => {
                  const rowData = calculateRowData(employee);
                  return <td key={employee.id}>{rowData[key] || '-'}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxContinuation;