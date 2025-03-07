import React, { useState } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  height: '100vh',
  overflow: 'hidden', // Ensure no scrollbar on the whole screen
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  height: '100%',
  position: 'relative',
  textAlign: 'center', // Center align the headings
  overflow: 'hidden', // Ensure no scrollbar on the section
}));

const CompletionCircle = styled('div')(({ theme, color }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
}));

const ScrollableList = styled(List)(({ theme }) => ({
  maxHeight: '300px', // Adjust the height as needed
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.grey[600],
  },
}));

const ListItemWrapper = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: 'calc(50% - 8px)', // Two items per row with some spacing
    margin: '4px',
  },
}));

const TaskDashboard = () => {
  const [month, setMonth] = useState('March 25');
  const categories = ['Marketing', 'Sales', 'Human Resources', 'IT Support', 'Customer Testimonials', 'Finance', 'Product Development'];
  const employees = ['Aagam Sheth', 'Avadai Marthuvar', 'Hrutika Mohal', 'Jahnvi Thakker', 'Joyeeta Khaskel', 'Komal Bhanushali', 'Preshita Rane', 'Priyanka Panjwani', 'Rajalaxmi Das', 'Rashesh Doshi', 'Rushali Rajgor', 'Snehal kadu', 'Surbhi Jain', 'Vaishnavi Bhagat', 'Vedika Tolani', 'Jagruti Doshi', 'Kajal Khamkar', 'Nishi Doshi', 'Deepti Singh', 'Bankim Doshi', 'Nita Doshi', 'Pragya Doshi', 'Chaitali Doshi', 'Preeti Doshi', 'Kinjal Patel', 'Minal Sanghvi', 'Jigna Sanghvi', 'SAUMYA KIRIT GALA', 'Shreya Santosh Talashilkar'];

  const getColor = (percentage) => {
    if (percentage >= 75) return 'green';
    if (percentage >= 50) return 'yellow';
    return 'red';
  };

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Task Dashboard
      </Typography>
      <FormControl fullWidth>
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
      </FormControl>

      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={3}>
          <StatBox>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">10</Typography>
          </StatBox>
        </Grid>
        <Grid item xs={3}>
          <StatBox>
            <Typography variant="h6">In Progress</Typography>
            <Typography variant="h4">5</Typography>
          </StatBox>
        </Grid>
        <Grid item xs={3}>
          <StatBox>
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h4">15</Typography>
          </StatBox>
        </Grid>
        <Grid item xs={3}>
          <StatBox>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">30</Typography>
          </StatBox>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={6}>
          <Section>
            <Typography variant="h6">Category Report</Typography>
            <ScrollableList>
              <Grid container spacing={1}>
                {categories.map((category, index) => (
                  <ListItemWrapper key={index}>
                    <CompletionCircle color={getColor(60)}>
                      <Typography variant="body2">60%</Typography>
                    </CompletionCircle>
                    <ListItemText
                      primary={category}
                      secondary={`Tasks: 3/5`}
                    />
                  </ListItemWrapper>
                ))}
              </Grid>
            </ScrollableList>
          </Section>
        </Grid>
        <Grid item xs={6}>
          <Section>
            <Typography variant="h6">Team Performance</Typography>
            <ScrollableList>
              <Grid container spacing={1}>
                {employees.map((employee, index) => (
                  <ListItemWrapper key={index}>
                    <CompletionCircle color={getColor(80)}>
                      <Typography variant="body2">80%</Typography>
                    </CompletionCircle>
                    <ListItemText
                      primary={employee}
                      secondary={`Tasks: 4/5`}
                    />
                  </ListItemWrapper>
                ))}
              </Grid>
            </ScrollableList>
          </Section>
        </Grid>
      </Grid>
    </Root>
  );
};

export default TaskDashboard;