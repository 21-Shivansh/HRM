import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Slider from 'react-slick';
import { Typography, Paper, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
};

const chartContainerStyle = {
  height: '50vh',
};

const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          precision: 0, 
        },
      },
    },
  };

const Dashboard = () => {

  const employees = [
    { id: 'E001', name: 'Aagam Sheth', status: 'Active', department: 'HR' },
    { id: 'E002', name: 'Avadai Marthuvar', status: 'Active', department: 'Recruitment and talent acquisition' },
    { id: 'E003', name: 'Hrutika Mohal', status: 'Inactive', department: 'Payroll and compensation' },
    { id: 'E004', name: 'Jahnvi Thakker', status: 'Active', department: 'Learning and development' },
    { id: 'E005', name: 'Joyeeta Khaskel', status: 'Active', department: 'Employee relations' },
    { id: 'E006', name: 'Komal Bhanushali', status: 'Active', department: 'Legal and compliance' },
    { id: 'E007', name: 'Preshita Rane', status: 'Inactive', department: 'Operations and administration' },
    { id: 'E008', name: 'Priyanka Panjwani', status: 'Active', department: 'Sales and business development' },
    { id: 'E009', name: 'Rajalaxmi Das', status: 'Active', department: 'Marketing and branding' },
    { id: 'E010', name: 'Rashesh Doshi', status: 'Active', department: 'IT and technical support' },
    { id: 'E011', name: 'Rushali Rajgor', status: 'Inactive', department: 'Finance and accounting' },
    { id: 'E012', name: 'Snehal kadu', status: 'Active', department: 'Project management' },
    { id: 'E013', name: 'Surbhi Jain', status: 'Active', department: 'Workforce planning' },
    { id: 'E014', name: 'Vaishnavi Bhagat', status: 'Inactive', department: 'Data analytics' },
    { id: 'E015', name: 'Vedika Tolani', status: 'Active', department: 'Admin' },
    { id: 'E016', name: 'Jagruti Doshi', status: 'Active', department: 'Franchise' },
    { id: 'E017', name: 'Kajal Khamkar', status: 'Inactive', department: 'HR' },
    { id: 'E018', name: 'Nishi Doshi', status: 'Active', department: 'Recruitment and talent acquisition' },
    { id: 'E019', name: 'Deepti Singh', status: 'Active', department: 'Payroll and compensation' },
    { id: 'E020', name: 'Bankim Doshi', status: 'Active', department: 'Learning and development' },
    { id: 'E021', name: 'Nita Doshi', status: 'Inactive', department: 'Employee relations' },
    { id: 'E022', name: 'Pragya Doshi', status: 'Active', department: 'Legal and compliance' },
    { id: 'E023', name: 'Chaitali Doshi', status: 'Active', department: 'Operations and administration' },
    { id: 'E024', name: 'Preeti Doshi', status: 'Active', department: 'Sales and business development' },
    { id: 'E025', name: 'Kinjal Patel', status: 'Active', department: 'Marketing and branding' },
    { id: 'E026', name: 'Minal Sanghvi', status: 'Active', department: 'IT and technical support' },
    { id: 'E027', name: 'Jigna Sanghvi', status: 'Active', department: 'Finance and accounting' },
    { id: 'E028', name: 'SAUMYA KIRIT GALA', status: 'Active', department: 'Project management' },
    { id: 'E029', name: 'Shreya Santosh Talashilkar', status: 'Inactive', department: 'Workforce planning' }
  ];

  const employeeStatusMap = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    status: employee.status,
    department: employee.department,
  }));
  
  const uniqueDepartments = [...new Set(employees.map((employee) => employee.department))];
  
  const pieData = {
    labels: ['Active Employees', 'Inactive Employees'],
    datasets: [
      {
        data: [
          employeeStatusMap.filter((employee) => employee.status === 'Active').length,
          employeeStatusMap.filter((employee) => employee.status === 'Inactive').length,
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const departmentData = {
    labels: uniqueDepartments,
    datasets: [
      {
        label: 'Number of Employees',
        data: uniqueDepartments.map(
          (department) => employeeStatusMap.filter((employee) => employee.department === department).length
        ),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Employee Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Active vs Inactive Employees</Typography>
            <div style={chartContainerStyle}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Employees by Department</Typography>
            <div style={chartContainerStyle}>
              <Bar data={departmentData} options={barChartOptions} />
            </div>
          </Grid>
        </Grid>
      </PaperStyled>

      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Upcoming Payrolls
        </Typography>
        <Slider {...sliderSettings}>
          <div>
            <Typography variant="h6">Next Payroll Date: 2025-03-01</Typography>
            <ButtonStyled variant="contained" color="primary" href="/generate-payslip">
              Generate Payslips
            </ButtonStyled>
          </div>
          <div>
            <Typography variant="h6">Next Payroll Date: 2025-04-01</Typography>
            <ButtonStyled variant="contained" color="primary" href="/generate-payslip">
              Generate Payslips
            </ButtonStyled>
          </div>
        </Slider>
      </PaperStyled>

      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Recent Payslips
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Employee ID: E001</Typography>
            <Typography variant="body1">Date Range: 2025-01-01 to 2025-01-31</Typography>
            <ButtonStyled variant="contained" color="primary" href="/download-payslip/E001">
              Download Payslip
            </ButtonStyled>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Employee ID: E002</Typography>
            <Typography variant="body1">Date Range: 2025-01-01 to 2025-01-31</Typography>
            <ButtonStyled variant="contained" color="primary" href="/download-payslip/E002">
              Download Payslip
            </ButtonStyled>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Employee ID: E003</Typography>
            <Typography variant="body1">Date Range: 2025-01-01 to 2025-01-31</Typography>
            <ButtonStyled variant="contained" color="primary" href="/download-payslip/E003">
              Download Payslip
            </ButtonStyled>
          </Grid>
        </Grid>
      </PaperStyled>

      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Tax Compliance
        </Typography>
        <Slider {...sliderSettings}>
          <div>
            <Typography variant="h6">PF Due Date: 2025-02-15</Typography>
          </div>
          <div>
            <Typography variant="h6">ESI Due Date: 2025-02-20</Typography>
          </div>
          <div>
            <Typography variant="h6">TDS Due Date: 2025-02-25</Typography>
          </div>
        </Slider>
      </PaperStyled>
    </Root>
  );
};

export default Dashboard;