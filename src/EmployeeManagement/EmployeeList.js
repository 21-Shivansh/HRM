import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../Components/CustomTable';
import { TextField, MenuItem, FormControl, InputLabel, Select, Button, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 100,
}));

const FormControlStyledWide = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 300,
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

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
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id={`actions-label-${index}`}>Actions</InputLabel>
        <Select
          labelId={`actions-label-${index}`}
          id={`actions-${index}`}
          onChange={(e) => {
            if (e.target.value === 'update') {
              navigate('/update-employee', { state: { employees, selectedEmployeeId: employee.id } });
            }
          }}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="view">View</MenuItem>
          <MenuItem value="update">Update</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
      </FormControl>
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
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Employee List
        </Typography>
        <div className="filters">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Search by Name or Employee ID"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="department-filter-label">Department</InputLabel>
                <Select
                  labelId="department-filter-label"
                  id="department-filter"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Recruitment and talent acquisition">Recruitment and talent acquisition</MenuItem>
                  <MenuItem value="Payroll and compensation">Payroll and compensation</MenuItem>
                  <MenuItem value="Learning and development">Learning and development</MenuItem>
                  <MenuItem value="Employee relations">Employee relations</MenuItem>
                  <MenuItem value="Legal and compliance">Legal and compliance</MenuItem>
                  <MenuItem value="Operations and administration">Operations and administration</MenuItem>
                  <MenuItem value="Sales and business development">Sales and business development</MenuItem>
                  <MenuItem value="Marketing and branding">Marketing and branding</MenuItem>
                  <MenuItem value="IT and technical support">IT and technical support</MenuItem>
                  <MenuItem value="Finance and accounting">Finance and accounting</MenuItem>
                  <MenuItem value="Project management">Project management</MenuItem>
                  <MenuItem value="Workforce planning">Workforce planning</MenuItem>
                  <MenuItem value="Data analytics">Data analytics</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Franchise">Franchise</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyledWide fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ minWidth: 300 }} 
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControlStyledWide>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={() => setSearchTerm('')}>
                Clear Filters
              </ButtonStyled>
            </Grid>
          </Grid>
        </div>
        <CustomTable columns={columns} data={filteredData} />
      </PaperStyled>
    </Root>
  );
}

export default EmployeeList;