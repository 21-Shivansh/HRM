import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const employees = [
  { id: 'E001', name: 'Aagam Sheth' },
  { id: 'E002', name: 'Avadai Marthuvar' },
  { id: 'E003', name: 'Hrutika Mohal' },
  { id: 'E004', name: 'Jahnvi Thakker' },
  { id: 'E005', name: 'Joyeeta Khaskel' },
  { id: 'E006', name: 'Komal Bhanushali' },
  { id: 'E007', name: 'Preshita Rane' },
  { id: 'E008', name: 'Priyanka Panjwani' },
  { id: 'E009', name: 'Rajalaxmi Das' },
  { id: 'E010', name: 'Rashesh Doshi' },
  { id: 'E011', name: 'Rushali Rajgor' },
  { id: 'E012', name: 'Snehal kadu' },
  { id: 'E013', name: 'Surbhi Jain' },
  { id: 'E014', name: 'Vaishnavi Bhagat' },
  { id: 'E015', name: 'Vedika Tolani' },
  { id: 'E016', name: 'Jagruti Doshi' },
  { id: 'E017', name: 'Kajal Khamkar' },
  { id: 'E018', name: 'Nishi Doshi' },
  { id: 'E019', name: 'Deepti Singh' },
  { id: 'E020', name: 'Bankim Doshi' },
  { id: 'E021', name: 'Nita Doshi' },
  { id: 'E022', name: 'Pragya Doshi' },
  { id: 'E023', name: 'Chaitali Doshi' },
  { id: 'E024', name: 'Preeti Doshi' },
  { id: 'E025', name: 'Kinjal Patel' },
  { id: 'E026', name: 'Minal Sanghvi' },
  { id: 'E027', name: 'Jigna Sanghvi' },
  { id: 'E028', name: 'SAUMYA KIRIT GALA' },
  { id: 'E029', name: 'Shreya Santosh Talashilkar' },
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

function Form16() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [tdsDeducted, setTdsDeducted] = useState('');
  const [totalSalary, setTotalSalary] = useState('');
  const [taxPaid, setTaxPaid] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'financialYear':
        setFinancialYear(value);
        break;
      case 'tdsDeducted':
        setTdsDeducted(value);
        break;
      case 'totalSalary':
        setTotalSalary(value);
        break;
      case 'taxPaid':
        setTaxPaid(value);
        break;
      default:
        break;
    }
  };

  const handleGenerate = () => {
    // Generate Form 16 logic here
    console.log('Generate Form 16');
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Generate Form 16
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
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="financialYear"
                name="financialYear"
                label="Financial Year"
                value={financialYear}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="tdsDeducted"
                name="tdsDeducted"
                label="TDS Deducted"
                value={tdsDeducted}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="totalSalary"
                name="totalSalary"
                label="Total Salary"
                value={totalSalary}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="taxPaid"
                name="taxPaid"
                label="Tax Paid"
                value={taxPaid}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleGenerate}>
                Generate Form 16
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
}

export default Form16;