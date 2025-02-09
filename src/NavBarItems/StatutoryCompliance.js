import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, Button, Grid, Typography, Paper, FormGroup, FormControlLabel } from '@mui/material';
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

const StatutoryCompliance = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [reportTypes, setReportTypes] = useState([]);
  const [exportFormat, setExportFormat] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from(new Array(26), (val, index) => index + 2000);

  const reportOptions = [
    'PF Report', 'ESI Report', 'PT Report', 'TDS Report', 'LWF Report', 
    'Gratuity and Pension Report', 'Minimum Wages Report', 
    'Shops and Establishment Act Compliance', 'Maternity Benefit Compliance', 
    'Equal Pay and Anti Discrimination Compliance'
  ];

  const handleGenerateReport = () => {
    // Logic to generate compliance report
    console.log('Generating compliance report...');
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
          Statutory Compliance
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Compliance Period
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Compliance Report Type
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
                Export Compliance Report As:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                  <MenuItem value="csv">CSV</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleGenerateReport}>
                Generate Compliance Report
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
};

export default StatutoryCompliance;