import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../Components/CustomTable';
import './EmployeeList.css';

const employees = [
  { id: 'E001', name: 'Aagam Sheth', salary: 29254, department: 'HR', doj: '2020-01-15', status: 'Active' },
  { id: 'E002', name: 'Avadai Marthuvar', salary: 29254, department: 'Finance', doj: '2019-03-22', status: 'Active' },
  { id: 'E003', name: 'Hrutika Mohal', salary: 22570, department: 'IT', doj: '2021-07-01', status: 'Inactive' },
  { id: 'E004', name: 'Jahnvi Thakker', salary: 50000, department: 'HR', doj: '2018-11-30', status: 'Active' },
  { id: 'E005', name: 'Joyeeta Khaskel', salary: 68550, department: 'Finance', doj: '2017-05-14', status: 'Active' },
  { id: 'E006', name: 'Komal Bhanushali', salary: 68550, department: 'IT', doj: '2020-09-23', status: 'Active' },
  { id: 'E007', name: 'Preshita Rane', salary: 51950, department: 'HR', doj: '2019-12-11', status: 'Inactive' },
  { id: 'E008', name: 'Priyanka Panjwani', salary: 51950, department: 'Finance', doj: '2018-08-19', status: 'Active' },
  { id: 'E009', name: 'Rajalaxmi Das', salary: 58786, department: 'IT', doj: '2021-04-05', status: 'Active' },
  { id: 'E010', name: 'Rashesh Doshi', salary: 150000, department: 'HR', doj: '2016-02-29', status: 'Active' },
  { id: 'E011', name: 'Rushali Rajgor', salary: 17000, department: 'Finance', doj: '2020-06-17', status: 'Inactive' },
  { id: 'E012', name: 'Snehal kadu', salary: 51950, department: 'IT', doj: '2019-10-10', status: 'Active' },
  { id: 'E013', name: 'Surbhi Jain', salary: 68550, department: 'HR', doj: '2018-01-25', status: 'Active' },
  { id: 'E014', name: 'Vaishnavi Bhagat', salary: 43160, department: 'Finance', doj: '2021-03-15', status: 'Inactive' },
  { id: 'E015', name: 'Vedika Tolani', salary: 34254, department: 'IT', doj: '2020-12-01', status: 'Active' },
  { id: 'E016', name: 'Jagruti Doshi', salary: 40000, department: 'HR', doj: '2019-07-20', status: 'Active' },
  { id: 'E017', name: 'Kajal Khamkar', salary: 18595, department: 'Finance', doj: '2021-05-10', status: 'Inactive' },
  { id: 'E018', name: 'Nishi Doshi', salary: 22500, department: 'IT', doj: '2020-11-05', status: 'Active' },
  { id: 'E019', name: 'Deepti Singh', salary: 21870, department: 'HR', doj: '2018-09-30', status: 'Active' },
  { id: 'E020', name: 'Bankim Doshi', salary: 150000, department: 'Finance', doj: '2017-04-18', status: 'Active' },
  { id: 'E021', name: 'Nita Doshi', salary: 40000, department: 'IT', doj: '2019-06-25', status: 'Inactive' },
  { id: 'E022', name: 'Pragya Doshi', salary: 50000, department: 'HR', doj: '2018-02-14', status: 'Active' },
  { id: 'E023', name: 'Chaitali Doshi', salary: 50000, department: 'Finance', doj: '2020-08-30', status: 'Active' },
  { id: 'E024', name: 'Preeti Doshi', salary: 50000, department: 'IT', doj: '2019-05-22', status: 'Active' },
  { id: 'E025', name: 'Kinjal Patel', salary: 40000, department: 'HR', doj: '2018-10-11', status: 'Active' },
  { id: 'E026', name: 'Minal Sanghvi', salary: 100000, department: 'Finance', doj: '2017-01-05', status: 'Active' },
  { id: 'E027', name: 'Jigna Sanghvi', salary: 100000, department: 'IT', doj: '2020-03-20', status: 'Active' },
  { id: 'E028', name: 'SAUMYA KIRIT GALA', salary: 100000, department: 'HR', doj: '2016-12-15', status: 'Active' },
  { id: 'E029', name: 'Shreya Santosh Talashilkar', salary: 29454, department: 'Finance', doj: '2021-07-25', status: 'Inactive' },
];

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const columns = [
    { header: 'Employee ID', accessor: 'employeeId' },
    { header: 'Name', accessor: 'name' },
    { header: 'Department', accessor: 'department' },
    { header: 'Date of Joining', accessor: 'doj' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'actions', className: 'actions-column' },
  ];

  const employeeData = employees.map((employee, index) => ({
    ...employee,
    employeeId: `E${String(index + 1).padStart(3, '0')}`,
    actions: (
      <select
        className="employeelist-select"
        onChange={(e) => {
          if (e.target.value === 'update') {
            navigate('/update-employee', { state: { employees, selectedEmployeeId: employee.id } });
          }
        }}
      >
        <option value="view">View</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>
    ),
  }));

  const filteredData = employeeData.filter((employee) => {
    return (
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (departmentFilter === '' || employee.department === departmentFilter) &&
      (statusFilter === '' || employee.status === statusFilter)
    );
  });

  return (
    <div className="employeelist-root">
      <div className="employeelist-paper">
        <h4 className="employeelist-title">Employee List</h4>
        <div className="employeelist-filters">
          <div className="employeelist-grid">
            <div className="employeelist-grid-item">
              <label htmlFor="search" className="employeelist-label">Search by Name or Employee ID</label>
              <input
                type="text"
                id="search"
                className="employeelist-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="employeelist-grid-item">
              <label htmlFor="department-filter" className="employeelist-label">Department</label>
              <select
                id="department-filter"
                className="employeelist-select"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="HR">HR</option>
                <option value="Recruitment and talent acquisition">Recruitment and talent acquisition</option>
                <option value="Payroll and compensation">Payroll and compensation</option>
                <option value="Learning and development">Learning and development</option>
                <option value="Employee relations">Employee relations</option>
                <option value="Legal and compliance">Legal and compliance</option>
                <option value="Operations and administration">Operations and administration</option>
                <option value="Sales and business development">Sales and business development</option>
                <option value="Marketing and branding">Marketing and branding</option>
                <option value="IT and technical support">IT and technical support</option>
                <option value="Finance and accounting">Finance and accounting</option>
                <option value="Project management">Project management</option>
                <option value="Workforce planning">Workforce planning</option>
                <option value="Data analytics">Data analytics</option>
                <option value="Admin">Admin</option>
                <option value="Franchise">Franchise</option>
              </select>
            </div>
            <div className="employeelist-grid-item">
              <label htmlFor="status-filter" className="employeelist-label">Status</label>
              <select
                id="status-filter"
                className="employeelist-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="employeelist-grid-item">
              <button className="employeelist-button" onClick={() => setSearchTerm('')}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}

export default EmployeeList;