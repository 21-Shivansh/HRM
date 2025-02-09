import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTable from '../Components/CustomTable';

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

const TaskHistory = () => {
  const [employee, setEmployee] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const employeeOptions = [
    'Aagam Sheth', 'Avadai Marthuvar', 'Hrutika Mohal', 'Jahnvi Thakker', 'Joyeeta Khaskel',
    'Komal Bhanushali', 'Preshita Rane', 'Priyanka Panjwani', 'Rajalaxmi Das', 'Rashesh Doshi',
    'Rushali Rajgor', 'Snehal kadu', 'Surbhi Jain', 'Vaishnavi Bhagat', 'Vedika Tolani',
    'Jagruti Doshi', 'Kajal Khamkar', 'Nishi Doshi', 'Deepti Singh', 'Bankim Doshi',
    'Nita Doshi', 'Pragya Doshi', 'Chaitali Doshi', 'Preeti Doshi', 'Kinjal Patel',
    'Minal Sanghvi', 'Jigna Sanghvi', 'SAUMYA KIRIT GALA', 'Shreya Santosh Talashilkar'
  ];

  const taskHistoryData = [
    {
      taskTitle: 'Task 1',
      assignedTo: 'Aagam Sheth',
      assignedDate: '2022-01-01',
      status: 'Completed',
      deadline: '2022-01-10',
      completionDate: '2022-01-09',
      remarks: 'Completed on time',
    },
    {
      taskTitle: 'Task 2',
      assignedTo: 'Avadai Marthuvar',
      assignedDate: '2022-02-01',
      status: 'In Progress',
      deadline: '2022-02-10',
      completionDate: '',
      remarks: 'Ongoing',
    },
    // Add more task history data as needed
  ];

  const columns = [
    { header: 'Task Title', accessor: 'taskTitle' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Assigned Date', accessor: 'assignedDate' },
    { header: 'Status', accessor: 'status' },
    { header: 'Deadline', accessor: 'deadline' },
    { header: 'Completion Date', accessor: 'completionDate' },
    { header: 'Remarks', accessor: 'remarks' },
  ];

  const filteredData = taskHistoryData.filter((task) => {
    return (
      (employee === '' || task.assignedTo === employee) &&
      (taskTitle === '' || task.taskTitle.toLowerCase().includes(taskTitle.toLowerCase())) &&
      (taskStatus === '' || task.status === taskStatus) &&
      (startDate === '' || new Date(task.assignedDate) >= new Date(startDate)) &&
      (endDate === '' || new Date(task.assignedDate) <= new Date(endDate))
    );
  });

  const handleDownloadTaskHistory = () => {
    // Logic to download task history
    console.log('Downloading task history...');
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Task History
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="employee-label">Employee</InputLabel>
                <Select
                  labelId="employee-label"
                  id="employee"
                  name="employee"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {employeeOptions.map((employee) => (
                    <MenuItem key={employee} value={employee}>
                      {employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="taskTitle"
                name="taskTitle"
                label="Task Title"
                fullWidth
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="taskStatus-label">Task Status</InputLabel>
                <Select
                  labelId="taskStatus-label"
                  id="taskStatus"
                  name="taskStatus"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <MenuItem value="not started">Not Started</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
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
              <ButtonStyled variant="contained" color="primary" onClick={handleDownloadTaskHistory}>
                Download Task History
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
        <CustomTable columns={columns} data={filteredData} />
      </PaperStyled>
    </Root>
  );
};

export default TaskHistory;