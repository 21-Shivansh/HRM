import React, { useState } from 'react';
import { Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RepeatIcon from '@mui/icons-material/Repeat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import InProgressIcon from '@mui/icons-material/HourglassEmpty';

import TaskDetailsModal from './MyTasksDetails';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StickyGrid = styled(Grid)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
  paddingBottom: theme.spacing(2),
}));

const ScrollableContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  scrollbarWidth: 0,
  marginTop: theme.spacing(2),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const SmallButtonStyled = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0.5),
    fontSize: '0.75rem',
    padding: theme.spacing(0.5),
}));

const tasks = [
    {
      id: 1,
      name: 'Record Videos for Marketing Gig',
      assignedBy: 'Aagam Sheth',
      deadline: '2025-03-07 10:00',
      status: 'Pending',
      category: 'Marketing',
      priority: 'High',
      repeat: 'Weekly',
    },
    {
      id: 2,
      name: 'Team Training',
      assignedBy: 'Hrutika Mohal',
      deadline: '2025-03-08 14:00',
      status: 'Completed',
      category: 'Human Resources',
      priority: 'Medium',
      repeat: 'Monthly',
    },
    {
      id: 3,
      name: 'Review Meet Presentation',
      assignedBy: 'Jahnvi Thakker',
      deadline: '2025-03-09 16:00',
      status: 'Pending',
      category: 'Sales',
      priority: 'High',
      repeat: 'Quarterly',
    },
    {
      id: 4,
      name: 'Add team members in task app',
      assignedBy: 'Joyeeta Khaskel',
      deadline: '2025-03-10 11:00',
      status: 'Pending',
      category: 'IT Support',
      priority: 'Low',
      repeat: 'Yearly',
    },
    {
        id: 5,
        name: 'Update Website Content',
        assignedBy: 'Komal Bhanushali',
        deadline: '2025-03-11 09:00',
        status: 'Pending',
        category: 'Marketing',
        priority: 'Medium',
        repeat: 'Monthly',
      },
      {
        id: 6,
        name: 'Client Feedback Analysis',
        assignedBy: 'Preshita Rane',
        deadline: '2025-03-12 13:00',
        status: 'Completed',
        category: 'Customer Testimonials',
        priority: 'High',
        repeat: 'Quarterly',
      },
      {
        id: 7,
        name: 'Prepare Financial Report',
        assignedBy: 'Priyanka Panjwani',
        deadline: '2025-03-13 15:00',
        status: 'Pending',
        category: 'Finance',
        priority: 'High',
        repeat: 'Monthly',
      },
      {
        id: 8,
        name: 'Organize Team Building Event',
        assignedBy: 'Rajalaxmi Das',
        deadline: '2025-03-14 10:00',
        status: 'Pending',
        category: 'Human Resources',
        priority: 'Medium',
        repeat: 'Yearly',
      },
      {
        id: 9,
        name: 'System Maintenance',
        assignedBy: 'Rashesh Doshi',
        deadline: '2025-03-07 12:00',
        status: 'Pending',
        category: 'IT Support',
        priority: 'High',
        repeat: 'Monthly',
      },
      {
        id: 10,
        name: 'Develop New Feature',
        assignedBy: 'Rushali Rajgor',
        deadline: '2025-03-16 14:00',
        status: 'Pending',
        category: 'Product Development',
        priority: 'High',
        repeat: 'Weekly',
      },
    ];


const MyTasks = () => {
  const [selectedButton, setSelectedButton] = useState('Upcoming');
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [priority, setPriority] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterTasks = () => {
    const today = new Date('2025-03-07');
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    switch (selectedButton) {
      case 'Due Today':
        return tasks.filter(task => new Date(task.deadline).toDateString() === today.toDateString());
      case 'Due This Week':
        return tasks.filter(task => {
          const taskDate = new Date(task.deadline);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      case 'Upcoming':
        return tasks.filter(task => new Date(task.deadline) > endOfWeek);
      case 'Completed':
        return tasks.filter(task => task.status === 'Completed');
      default:
        return tasks;
    }
  };
  
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskClick = () => {
    const dummyTask = {
      id: 1,
      name: 'Team Training',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      assignedTo: ['Nishi Doshi', 'Nita Doshi'],
      category: ['Administration', 'Marketing'],
      deadline: '2025-03-12 12:00',
      repeat: false,
      repeatFrequency: '',
      attachments: ['traineeinstruction.pdf'],
      priority: 'High',
      voiceNotes: ['15 seconds', '1 minute 50 seconds'],
      updates: [
        { text: 'Started today', timestamp: '7/3/2025 10:00:35 am' }
      ]
    };
    setSelectedTask(dummyTask);
    setIsModalOpen(true);
  };

  return (
    <Root>
      <StickyGrid container spacing={2} justifyContent="space-between">
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedButton === 'Due Today' ? 'primary.main' : 'default.main',
            '&:hover': {
              backgroundColor: selectedButton === 'Due Today' ? 'primary.dark' : 'default.dark',
            },
          }}
          onClick={() => setSelectedButton('Due Today')}
        >
          Due Today
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedButton === 'Due This Week' ? 'primary.main' : 'default.main',
            '&:hover': {
              backgroundColor: selectedButton === 'Due This Week' ? 'primary.dark' : 'default.dark',
            },
          }}
          onClick={() => setSelectedButton('Due This Week')}
        >
          Due This Week
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedButton === 'Upcoming' ? 'primary.main' : 'default.main',
            '&:hover': {
              backgroundColor: selectedButton === 'Upcoming' ? 'primary.dark' : 'default.dark',
            },
          }}
          onClick={() => setSelectedButton('Upcoming')}
        >
          Upcoming
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedButton === 'Completed' ? 'primary.main' : 'default.main',
            '&:hover': {
              backgroundColor: selectedButton === 'Completed' ? 'primary.dark' : 'default.dark',
            },
          }}
          onClick={() => setSelectedButton('Completed')}
        >
          Completed
        </Button>
      </Grid>
    </StickyGrid>

      <StickyGrid container spacing={2} justifyContent="space-between" style={{ marginTop: '16px' }}>
        <Grid item xs={2}>
            <FormControlStyled fullWidth>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
                labelId="month-label"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            >
                <MenuItem value="March 25">March 25</MenuItem>
                <MenuItem value="April 25">April 25</MenuItem>
                <MenuItem value="May 25">May 25</MenuItem>
                <MenuItem value="June 25">June 25</MenuItem>
                <MenuItem value="July 25">July 25</MenuItem>
            </Select>
            </FormControlStyled>
        </Grid>
        <Grid item xs={2}>
            <FormControlStyled fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
                <MenuItem value="IT Support">IT Support</MenuItem>
                <MenuItem value="Customer Testimonials">Customer Testimonials</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Product Development">Product Development</MenuItem>
            </Select>
            </FormControlStyled>
        </Grid>
        <Grid item xs={2}>
            <FormControlStyled fullWidth>
            <InputLabel id="assignedBy-label">Assigned By</InputLabel>
            <Select
                labelId="assignedBy-label"
                id="assignedBy"
                value={assignedBy}
                onChange={(e) => setAssignedBy(e.target.value)}
            >
                <MenuItem value="Aagam Sheth">Aagam Sheth</MenuItem>
                <MenuItem value="Hrutika Mohal">Hrutika Mohal</MenuItem>
                <MenuItem value="Jahnvi Thakker">Jahnvi Thakker</MenuItem>
                <MenuItem value="Joyeeta Khaskel">Joyeeta Khaskel</MenuItem>
                <MenuItem value="Komal Bhanushali">Komal Bhanushali</MenuItem>
                <MenuItem value="Preshita Rane">Preshita Rane</MenuItem>
                <MenuItem value="Priyanka Panjwani">Priyanka Panjwani</MenuItem>
                <MenuItem value="Rajalaxmi Das">Rajalaxmi Das</MenuItem>
                <MenuItem value="Rashesh Doshi">Rashesh Doshi</MenuItem>
                <MenuItem value="Rushali Rajgor">Rushali Rajgor</MenuItem>
            </Select>
            </FormControlStyled>
        </Grid>
        <Grid item xs={2}>
            <FormControlStyled fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
                labelId="priority-label"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
            </Select>
            </FormControlStyled>
        </Grid>
        <Grid item xs={2}>
            <FormControlStyled fullWidth>
            <InputLabel id="frequency-label">Frequency</InputLabel>
            <Select
                labelId="frequency-label"
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
            </FormControlStyled>
        </Grid>
      </StickyGrid>

      <ScrollableContent> 
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {filterTasks().map((task) => (
          <Grid item xs={12} key={task.id} onClick={() => handleTaskClick(task)}>
            <PaperStyled>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant="h6">{task.name}</Typography>
                  <Typography variant="body2">Assigned By {task.assignedBy}</Typography>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon />
                      <Typography variant="body2" display="inline" style={{ marginLeft: 4 }}>{task.deadline}</Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      {task.status === 'Completed' ? <CheckCircleIcon color="primary" /> : <PendingIcon color="secondary" />}
                      <Typography variant="body2" display="inline" style={{ marginLeft: 4 }}>{task.status}</Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <CategoryIcon />
                      <Typography variant="body2" display="inline" style={{ marginLeft: 4 }}>{task.category}</Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <PriorityHighIcon style={{ color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green' }} />
                      <Typography variant="body2" display="inline" style={{ marginLeft: 4 }}>{task.priority}</Typography>
                    </Grid>
                    {task.repeat && (
                      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <RepeatIcon />
                        <Typography variant="body2" display="inline" style={{ marginLeft: 4 }}>{task.repeat}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction='column' alignItems="flex-end">
                    <Grid item>
                      <SmallButtonStyled variant="contained" color="primary" startIcon={<InProgressIcon />}>In Progress</SmallButtonStyled>
                    </Grid>
                    <Grid item>
                      <SmallButtonStyled variant="contained" color="success" startIcon={<CheckCircleIcon />}>Completed</SmallButtonStyled>
                    </Grid>
                    <Grid item>
                      <SmallButtonStyled variant="contained" color="error" startIcon={<DeleteIcon />}>Delete Task</SmallButtonStyled>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaperStyled>
          </Grid>
        ))}
      </Grid>
      </ScrollableContent>

      <TaskDetailsModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        selectedTask={selectedTask}
      />

    </Root>
  );
};

export default MyTasks;