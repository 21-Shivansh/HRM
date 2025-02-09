import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Grid, Typography, Paper, FormGroup, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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

const PayrollReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportTypes, setReportTypes] = useState([]);
  const [employeeSelection, setEmployeeSelection] = useState('all');
  const [specificEmployee, setSpecificEmployee] = useState('');
  const [exportFormat, setExportFormat] = useState('');

  const reportOptions = [
    'Salary Register', 'Payslip Reports', 'Attendance and Overtime Report', 
    'Bonus and Incentive Report', 'Payroll Summary Report', 
    'Tax Deduction Report (TDS, EPF, ESI, PT)', 'Loan and Advance Report', 
    'Reimbursement Report', 'Bank Advice Report', 'Gratuity and Pension Report'
  ];

  const employeeOptions = [
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

  const handleGenerateReport = () => {
    // Logic to generate report
    console.log('Generating report...');
  };

  const handleReportTypeChange = (event) => {
    const value = event.target.value;
    setReportTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Payroll Reports
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Date Range
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Payroll Report Type
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlStyled fullWidth>
                <FormGroup row>
                  {reportOptions.map((report) => (
                    <FormControlLabel
                      key={report}
                      control={
                        <Checkbox
                          checked={reportTypes.includes(report)}
                          onChange={handleReportTypeChange}
                          value={report}
                        />
                      }
                      label={report}
                    />
                  ))}
                </FormGroup>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Employee Selection
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlStyled fullWidth>
                <RadioGroup
                  row
                  value={employeeSelection}
                  onChange={(event) => setEmployeeSelection(event.target.value)}
                >
                  <FormControlLabel value="all" control={<Radio />} label="All Employees" />
                  <FormControlLabel value="specific" control={<Radio />} label="Specific Employees" />
                </RadioGroup>
              </FormControlStyled>
            </Grid>
            {employeeSelection === 'specific' && (
              <Grid item xs={12} sm={6}>
                <FormControlStyled fullWidth>
                  <InputLabel>Specific Employee</InputLabel>
                  <Select
                    value={specificEmployee}
                    onChange={(event) => setSpecificEmployee(event.target.value)}
                  >
                    {employeeOptions.map((employee) => (
                      <MenuItem key={employee.id} value={employee.name}>
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControlStyled>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Export Report As:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={exportFormat}
                  onChange={(event) => setExportFormat(event.target.value)}
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleGenerateReport}>
                Generate Report
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
};

export default PayrollReports;