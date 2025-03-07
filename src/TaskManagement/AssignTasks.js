import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
}));

const ButtonStyledRightIcon = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'none',
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: '#d3d3d3',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}));

const AssignTasks = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [category, setCategory] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [recordedDuration, setRecordedDuration] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const employeeOptions = [
    'Aagam Sheth', 'Avadai Marthuvar', 'Hrutika Mohal', 'Jahnvi Thakker', 'Joyeeta Khaskel',
    'Komal Bhanushali', 'Preshita Rane', 'Priyanka Panjwani', 'Rajalaxmi Das', 'Rashesh Doshi',
    'Rushali Rajgor', 'Snehal kadu', 'Surbhi Jain', 'Vaishnavi Bhagat', 'Vedika Tolani',
    'Jagruti Doshi', 'Kajal Khamkar', 'Nishi Doshi', 'Deepti Singh', 'Bankim Doshi',
    'Nita Doshi', 'Pragya Doshi', 'Chaitali Doshi', 'Preeti Doshi', 'Kinjal Patel',
    'Minal Sanghvi', 'Jigna Sanghvi', 'SAUMYA KIRIT GALA', 'Shreya Santosh Talashilkar'
  ];

  const categoryOptions = [
    'Customer Testimonials', 'Accounts', 'Customer Referrals', 'Marketing', 'Sales',
    'Product Development', 'Human Resources', 'IT Support', 'Legal', 'Compliance',
    'Operations', 'Administration', 'Finance', 'Project Management', 'Research and Development'
  ];

  const handleAssignTask = () => {
    // Logic to handle task assignment
    console.log('Task assigned:', {
      taskTitle,
      description,
      assignedTo,
      category,
      deadline,
      repeat,
      attachments,
      voiceNotes,
      priority,
    });

    // Show Snackbar
    setOpenSnackbar(true);

    // Reset the form
    setTaskTitle('');
    setDescription('');
    setAssignedTo([]);
    setCategory([]);
    setDeadline('');
    setRepeat(false);
    setAttachments([]);
    setPriority('medium');
    setRecording(false);
    setRecordingTime(0);
    setVoiceNotes([]);
    setRecordedDuration(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const handleRecordVoiceNote = () => {
    setRecording(true);
    setRecordingTime(0);
    setRecordedDuration(null);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setVoiceNotes([...voiceNotes, recordingTime]);
    setRecordedDuration(recordingTime);
  };

  const formatTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleDeleteVoiceNote = () => {
    setRecordedDuration(null);
  };

  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!recording && recordingTime !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [recording]);

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Assign New Task
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Short Description of the Task"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlStyled fullWidth>
                <InputLabel id="assignedTo-label">Select User</InputLabel>
                <Select
                  labelId="assignedTo-label"
                  id="assignedTo"
                  name="assignedTo"
                  multiple
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  {employeeOptions.map((employee) => (
                    <MenuItemStyled key={employee} value={employee} selected={assignedTo.includes(employee)}>
                      {employee}
                    </MenuItemStyled>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <FormControlStyled fullWidth>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  multiple
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryOptions.map((cat) => (
                    <MenuItemStyled key={cat} value={cat} selected={category.includes(cat)}>
                      {cat}
                    </MenuItemStyled>
                  ))}
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="deadline"
                name="deadline"
                label="Deadline"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={repeat}
                    onChange={(e) => setRepeat(e.target.checked)}
                    name="repeat"
                    color="primary"
                  />
                }
                label="Repeat"
              />
            </Grid>
            {repeat && (
              <Grid item xs={12}>
                <FormControlStyled fullWidth>
                  <InputLabel id="repeat-frequency-label">Repeat Frequency</InputLabel>
                  <Select
                    labelId="repeat-frequency-label"
                    id="repeat-frequency"
                    name="repeatFrequency"
                    value={repeatFrequency}
                    onChange={(e) => setRepeatFrequency(e.target.value)}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControlStyled>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6">Priority</Typography>
              <ToggleButtonGroup
                value={priority}
                exclusive
                onChange={(e, newPriority) => setPriority(newPriority)}
                aria-label="priority"
              >
                <ToggleButton value="high" aria-label="high">
                  High
                </ToggleButton>
                <ToggleButton value="medium" aria-label="medium">
                  Medium
                </ToggleButton>
                <ToggleButton value="low" aria-label="low">
                  Low
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyledRightIcon
                variant="contained"
                component="label"
                endIcon={<AttachFileIcon />}
              >
                Upload Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileChange}
              />
            </ButtonStyledRightIcon>
            {attachments && attachments.length > 0 && (
              <Grid item xs={12}>
                {attachments.map((file, index) => (
                  <Typography key={index} variant="body1">
                    {file.name}
                    <IconButton onClick={() => handleDeleteAttachment(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                ))}
              </Grid>
            )}
            </Grid>
            <Grid item xs={12}>
              {recording ? (
                <ButtonStyledRightIcon
                  variant="contained"
                  color="secondary"
                  endIcon={<StopIcon />}
                  onClick={handleStopRecording}
                >
                  Recording... {formatTime(recordingTime)}
                </ButtonStyledRightIcon>
              ) : (
                <ButtonStyledRightIcon
                  variant="contained"
                  color="primary"
                  endIcon={<MicIcon />}
                  onClick={handleRecordVoiceNote}
                >
                  Record Voice Note
                </ButtonStyledRightIcon>
              )}
            </Grid>
            {voiceNotes && voiceNotes.length > 0 && (
              <Grid item xs={12}>
                {voiceNotes.map((duration, index) => (
                  <Typography key={index} variant="body1">
                    Voice Note Duration: {formatTime(duration)}
                    <IconButton onClick={() => handleDeleteVoiceNote(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                ))}
              </Grid>
            )}
            <Grid item xs={12}>
              <ButtonStyled
                variant="contained"
                color="primary"
                startIcon={<AssignmentIcon />}
                onClick={handleAssignTask}
              >
                Assign Task
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </PaperStyled>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Task Delegated
        </Alert>
      </Snackbar>
    </Root>
  );
};

export default AssignTasks;