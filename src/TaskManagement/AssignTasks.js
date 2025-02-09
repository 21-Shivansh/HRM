import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

const AssignTasks = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [attachments, setAttachments] = useState(null);

  const employeeOptions = [
    'Aagam Sheth', 'Avadai Marthuvar', 'Hrutika Mohal', 'Jahnvi Thakker', 'Joyeeta Khaskel',
    'Komal Bhanushali', 'Preshita Rane', 'Priyanka Panjwani', 'Rajalaxmi Das', 'Rashesh Doshi',
    'Rushali Rajgor', 'Snehal kadu', 'Surbhi Jain', 'Vaishnavi Bhagat', 'Vedika Tolani',
    'Jagruti Doshi', 'Kajal Khamkar', 'Nishi Doshi', 'Deepti Singh', 'Bankim Doshi',
    'Nita Doshi', 'Pragya Doshi', 'Chaitali Doshi', 'Preeti Doshi', 'Kinjal Patel',
    'Minal Sanghvi', 'Jigna Sanghvi', 'SAUMYA KIRIT GALA', 'Shreya Santosh Talashilkar'
  ];

  const handleAssignTask = () => {
    // Logic to handle task assignment
    console.log('Task assigned:', {
      taskTitle,
      description,
      assignedTo,
      priority,
      deadline,
      taskStatus,
      attachments,
    });
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Assign Task
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="taskTitle"
                name="taskTitle"
                label="Task Title"
                fullWidth
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="assignedTo-label">Assigned To</InputLabel>
                <Select
                  labelId="assignedTo-label"
                  id="assignedTo"
                  name="assignedTo"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  {employeeOptions.map((employee) => (
                    <MenuItem key={employee} value={employee}>
                      {employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlStyled fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="deadline"
                name="deadline"
                label="Deadline"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
              <Button
                variant="contained"
                component="label"
              >
                Upload Attachments
                <input
                  type="file"
                  hidden
                  onChange={(e) => setAttachments(e.target.files)}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled variant="contained" color="primary" onClick={handleAssignTask}>
                Assign
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
    </Root>
  );
};

export default AssignTasks;