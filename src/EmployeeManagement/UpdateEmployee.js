import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const employees = [
  { id: 'E001', name: 'Aagam Sheth', salary: 29254, department: 'HR', position: 'Manager', doj: '2020-01-15', status: 'Active' },
  { id: 'E002', name: 'Avadai Marthuvar', salary: 29254, department: 'Finance', position: 'Analyst', doj: '2019-03-22', status: 'Active' },
  { id: 'E003', name: 'Hrutika Mohal', salary: 22570, department: 'IT', position: 'Developer', doj: '2021-07-01', status: 'Inactive' },
  { id: 'E004', name: 'Jahnvi Thakker', salary: 50000, department: 'HR', position: 'Executive', doj: '2018-11-30', status: 'Active' },
  { id: 'E005', name: 'Joyeeta Khaskel', salary: 68550, department: 'Finance', position: 'Manager', doj: '2017-05-14', status: 'Active' },
  { id: 'E006', name: 'Komal Bhanushali', salary: 68550, department: 'IT', position: 'Developer', doj: '2020-09-23', status: 'Active' },
  { id: 'E007', name: 'Preshita Rane', salary: 51950, department: 'HR', position: 'Executive', doj: '2019-12-11', status: 'Inactive' },
  { id: 'E008', name: 'Priyanka Panjwani', salary: 51950, department: 'Finance', position: 'Analyst', doj: '2018-08-19', status: 'Active' },
  { id: 'E009', name: 'Rajalaxmi Das', salary: 58786, department: 'IT', position: 'Developer', doj: '2021-04-05', status: 'Active' },
  { id: 'E010', name: 'Rashesh Doshi', salary: 150000, department: 'HR', position: 'Manager', doj: '2016-02-29', status: 'Active' },
  { id: 'E011', name: 'Rushali Rajgor', salary: 17000, department: 'Finance', position: 'Analyst', doj: '2020-06-17', status: 'Inactive' },
  { id: 'E012', name: 'Snehal kadu', salary: 51950, department: 'IT', position: 'Developer', doj: '2019-10-10', status: 'Active' },
  { id: 'E013', name: 'Surbhi Jain', salary: 68550, department: 'HR', position: 'Executive', doj: '2018-01-25', status: 'Active' },
  { id: 'E014', name: 'Vaishnavi Bhagat', salary: 43160, department: 'Finance', position: 'Analyst', doj: '2021-03-15', status: 'Inactive' },
  { id: 'E015', name: 'Vedika Tolani', salary: 34254, department: 'IT', position: 'Developer', doj: '2020-12-01', status: 'Active' },
  { id: 'E016', name: 'Jagruti Doshi', salary: 40000, department: 'HR', position: 'Executive', doj: '2019-07-20', status: 'Active' },
  { id: 'E017', name: 'Kajal Khamkar', salary: 18595, department: 'Finance', position: 'Analyst', doj: '2021-05-10', status: 'Inactive' },
  { id: 'E018', name: 'Nishi Doshi', salary: 22500, department: 'IT', position: 'Developer', doj: '2020-11-05', status: 'Active' },
  { id: 'E019', name: 'Deepti Singh', salary: 21870, department: 'HR', position: 'Executive', doj: '2018-09-30', status: 'Active' },
  { id: 'E020', name: 'Bankim Doshi', salary: 150000, department: 'Finance', position: 'Manager', doj: '2017-04-18', status: 'Active' },
  { id: 'E021', name: 'Nita Doshi', salary: 40000, department: 'IT', position: 'Developer', doj: '2019-06-25', status: 'Inactive' },
  { id: 'E022', name: 'Pragya Doshi', salary: 50000, department: 'HR', position: 'Executive', doj: '2018-02-14', status: 'Active' },
  { id: 'E023', name: 'Chaitali Doshi', salary: 50000, department: 'Finance', position: 'Analyst', doj: '2020-08-30', status: 'Active' },
  { id: 'E024', name: 'Preeti Doshi', salary: 50000, department: 'IT', position: 'Developer', doj: '2019-05-22', status: 'Active' },
  { id: 'E025', name: 'Kinjal Patel', salary: 40000, department: 'HR', position: 'Executive', doj: '2018-10-11', status: 'Active' },
  { id: 'E026', name: 'Minal Sanghvi', salary: 100000, department: 'Finance', position: 'Manager', doj: '2017-01-05', status: 'Active' },
  { id: 'E027', name: 'Jigna Sanghvi', salary: 100000, department: 'IT', position: 'Developer', doj: '2020-03-20', status: 'Active' },
  { id: 'E028', name: 'SAUMYA KIRIT GALA', salary: 100000, department: 'HR', position: 'Manager', doj: '2016-12-15', status: 'Active' },
  { id: 'E029', name: 'Shreya Santosh Talashilkar', salary: 29454, department: 'Finance', position: 'Analyst', doj: '2021-07-25', status: 'Inactive' },
];

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

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
    position: '',
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
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Update Employee
        </Typography>
        <FormControlStyled fullWidth>
          <InputLabel id="employee-select-label">Select Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControlStyled>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="employeeId"
                name="employeeId"
                label="Employee ID"
                value={employee.employeeId}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                value={employee.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                value={employee.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="dob"
                name="dob"
                label="Date of Birth"
                type="date"
                value={employee.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={employee.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contact"
                name="contact"
                label="Contact Information"
                value={employee.contact}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="department"
                name="department"
                label="Department"
                value={employee.department}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="position"
                name="position"
                label="Position"
                value={employee.position}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="doj"
                name="doj"
                label="Date of Joining"
                type="date"
                value={employee.doj}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="salary"
                name="salary"
                label="Salary Details"
                value={employee.salary}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bankAccount"
                name="bankAccount"
                label="Bank Account Information"
                value={employee.bankAccount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="emergencyContact"
                name="emergencyContact"
                label="Emergency Contacts"
                value={employee.emergencyContact}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                value={employee.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="documents"
                name="documents"
                label="Documents (ID Proofs, Address Proofs)"
                value={employee.documents}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" type="submit">
                Update
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
}

export default UpdateEmployee;