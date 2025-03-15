import React, { useState } from 'react';
import './AddEmployee.css';

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

function AddEmployee() {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="addemployee-root">
      <div className="addemployee-paper">
        <h4 className="addemployee-title">Add Employee</h4>
        <form noValidate autoComplete="off">
          <div className="addemployee-grid">
            <div className="addemployee-grid-item">
              <label htmlFor="employeeid" className="addemployee-label">Employee ID</label>
              <input type="text" id="employeeid" name="employeeid" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="firstName" className="addemployee-label">First Name</label>
              <input type="text" id="firstName" name="firstName" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="lastName" className="addemployee-label">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="dob" className="addemployee-label">Date of Birth</label>
              <input type="date" id="dob" name="dob" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="gender" className="addemployee-label">Gender</label>
              <select id="gender" name="gender" className="addemployee-select" value={gender} onChange={handleGenderChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="contact" className="addemployee-label">Contact Information</label>
              <input type="text" id="contact" name="contact" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="department" className="addemployee-label">Department</label>
              <select id="department" name="department" className="addemployee-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">Select Department</option>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="doj" className="addemployee-label">Date of Joining</label>
              <input type="date" id="doj" name="doj" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="salary" className="addemployee-label">Salary Details</label>
              <input type="text" id="salary" name="salary" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="bankAccount" className="addemployee-label">Bank Account Information</label>
              <input type="text" id="bankAccount" name="bankAccount" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="emergencyContact" className="addemployee-label">Emergency Contacts</label>
              <input type="text" id="emergencyContact" name="emergencyContact" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="address" className="addemployee-label">Address</label>
              <input type="text" id="address" name="address" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="documents" className="addemployee-label">Documents (ID Proofs, Address Proofs)</label>
              <input type="text" id="documents" name="documents" className="addemployee-input" required />
            </div>
            <div className="addemployee-grid-item">
              <label htmlFor="status" className="addemployee-label">Status</label>
              <select id="status" name="status" className="addemployee-select" value={status} onChange={handleStatusChange} required>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="addemployee-grid-item">
              <button type="submit" className="addemployee-button">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;