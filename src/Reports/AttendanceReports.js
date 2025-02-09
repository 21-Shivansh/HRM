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

function AttendanceReports() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [status, setStatus] = useState('');
  const [attendanceSummary, setAttendanceSummary] = useState({ present: 0, absent: 0, leave: 0 });

  useEffect(() => {
    const calculateAttendanceSummary = () => {
      // Placeholder logic for attendance summary calculation
      const summary = { present: 20, absent: 5, leave: 2 }; // Replace with actual calculation logic
      setAttendanceSummary(summary);
    };

    calculateAttendanceSummary();
  }, [selectedEmployeeId, dateRange, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in dateRange) {
      setDateRange((prevDateRange) => ({
        ...prevDateRange,
        [name]: value,
      }));
    } else {
      switch (name) {
        case 'status':
          setStatus(value);
          break;
        default:
          break;
      }
    }
  };

  const handleDownload = () => {
    // Download attendance report logic here
    console.log('Download Attendance Report');
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Attendance Reports
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
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                value={dateRange.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                value={dateRange.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
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
                  value={status}
                  onChange={handleChange}
                >
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                  <MenuItem value="leave">Leave</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="present"
                name="present"
                label="Days Present"
                value={attendanceSummary.present}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="absent"
                name="absent"
                label="Days Absent"
                value={attendanceSummary.absent}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="leave"
                name="leave"
                label="Days on Leave"
                value={attendanceSummary.leave}
                onChange={handleChange}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleDownload}>
                Download Attendance Report
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
}

export default AttendanceReports;