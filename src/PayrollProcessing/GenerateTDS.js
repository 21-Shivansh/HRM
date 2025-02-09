import React, { useState, useEffect } from 'react';
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

function GenerateTDS() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [month, setMonth] = useState('');
  const [tdsAmount, setTdsAmount] = useState('');

  useEffect(() => {
    const calculateTdsAmount = () => {
      // Placeholder logic for TDS calculation
      const tds = 1000; // Replace with actual calculation logic
      setTdsAmount(tds.toFixed(2));
    };

    calculateTdsAmount();
  }, [selectedEmployeeId, financialYear, month]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'financialYear':
        setFinancialYear(value);
        break;
      case 'month':
        setMonth(value);
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    // Download TDS logic here
    console.log('Download TDS');
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Generate TDS
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
              <FormControlStyled fullWidth>
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  name="month"
                  value={month}
                  onChange={handleChange}
                >
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="February">February</MenuItem>
                  <MenuItem value="March">March</MenuItem>
                  <MenuItem value="April">April</MenuItem>
                  <MenuItem value="May">May</MenuItem>
                  <MenuItem value="June">June</MenuItem>
                  <MenuItem value="July">July</MenuItem>
                  <MenuItem value="August">August</MenuItem>
                  <MenuItem value="September">September</MenuItem>
                  <MenuItem value="October">October</MenuItem>
                  <MenuItem value="November">November</MenuItem>
                  <MenuItem value="December">December</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="tdsAmount"
                name="tdsAmount"
                label="TDS Amount"
                value={tdsAmount}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleDownload}>
                Download TDS
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
}

export default GenerateTDS;