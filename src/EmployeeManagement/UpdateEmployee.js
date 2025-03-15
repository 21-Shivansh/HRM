import React, { useState, useEffect } from 'react';
import './UpdateEmployee.css';

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

const departmentOptions = [
  'HR',
  'Recruitment and talent acquisition',
  'Payroll and compensation',
  'Learning and development',
  'Employee relations',
  'Legal and compliance',
  'Operations and administration',
  'Sales and business development',
  'Marketing and branding',
  'IT and technical support',
  'Finance and accounting',
  'Project management',
  'Workforce planning',
  'Data analytics',
  'Admin',
  'Franchise',
];

function UpdateEmployee() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [employee, setEmployee] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    contact: '',
    department: '',
    doj: '',
    salary: '',
    bankAccount: '',
    emergencyContact: '',
    address: '',
    documents: '',
    status: '',
  });

  useEffect(() => {
    if (selectedEmployeeId) {
      const selectedEmp = employees.find(emp => emp.id === selectedEmployeeId);
      if (selectedEmp) {
        setEmployee(selectedEmp);
      }
    }
  }, [selectedEmployeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update employee data logic here
    console.log('Updated Employee Data:', employee);
  };

  return (
    <div className="updateemployee-root">
      <div className="updateemployee-paper">
        <h4 className="updateemployee-title">Update Employee</h4>
        <div className="updateemployee-form-control">
          <label htmlFor="employee-select" className="updateemployee-label">Select Employee</label>
          <select
            id="employee-select"
            className="updateemployee-select"
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="updateemployee-grid">
            <div className="updateemployee-grid-item">
              <label htmlFor="employeeId" className="updateemployee-label">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                className="updateemployee-input"
                value={employee.employeeId}
                onChange={handleChange}
                disabled
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="firstName" className="updateemployee-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="updateemployee-input"
                value={employee.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="lastName" className="updateemployee-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="updateemployee-input"
                value={employee.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="dob" className="updateemployee-label">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="updateemployee-input"
                value={employee.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="gender" className="updateemployee-label">Gender</label>
              <select
                id="gender"
                name="gender"
                className="updateemployee-select"
                value={employee.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="contact" className="updateemployee-label">Contact Information</label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="updateemployee-input"
                value={employee.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="department" className="updateemployee-label">Department</label>
              <select
                id="department"
                name="department"
                className="updateemployee-select"
                value={employee.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="doj" className="updateemployee-label">Date of Joining</label>
              <input
                type="date"
                id="doj"
                name="doj"
                className="updateemployee-input"
                value={employee.doj}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="salary" className="updateemployee-label">Salary Details</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="updateemployee-input"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="bankAccount" className="updateemployee-label">Bank Account Information</label>
              <input
                type="text"
                id="bankAccount"
                name="bankAccount"
                className="updateemployee-input"
                value={employee.bankAccount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="emergencyContact" className="updateemployee-label">Emergency Contacts</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                className="updateemployee-input"
                value={employee.emergencyContact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="address" className="updateemployee-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="updateemployee-input"
                value={employee.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="documents" className="updateemployee-label">Documents (ID Proofs, Address Proofs)</label>
              <input
                type="text"
                id="documents"
                name="documents"
                className="updateemployee-input"
                value={employee.documents}
                onChange={handleChange}
                required
              />
            </div>
            <div className="updateemployee-grid-item">
              <label htmlFor="status" className="updateemployee-label">Status</label>
              <select
                id="status"
                name="status"
                className="updateemployee-select"
                value={employee.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="updateemployee-grid-item">
              <button type="submit" className="updateemployee-button">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;