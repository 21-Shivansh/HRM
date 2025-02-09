import React from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const [gender, setGender] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [department, setDepartment] = React.useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="employeeid" name="employeeid" label="Employee ID" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="firstName" name="firstName" label="First Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="lastName" name="lastName" label="Last Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="dob" name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select labelId="gender-label" id="gender" value={gender} onChange={handleGenderChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="contact" name="contact" label="Contact Information" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departmentOptions.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="doj" name="doj" label="Date of Joining" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="salary" name="salary" label="Salary Details" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="bankAccount" name="bankAccount" label="Bank Account Information" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="emergencyContact" name="emergencyContact" label="Emergency Contacts" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="address" name="address" label="Address" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="documents" name="documents" label="Documents (ID Proofs, Address Proofs)" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select labelId="status-label" id="status" value={status} onChange={handleStatusChange}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary">
                Submit
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
}

export default AddEmployee;