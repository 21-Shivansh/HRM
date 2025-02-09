import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Profile.css';

// Register the components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HRProfile() {
  // Example data, you can replace this with actual data fetched from an API
  const [hrDetails, setHrDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    department: 'Human Resources',
    projects: [
      { id: 1, name: 'Project Alpha', status: 'In Progress' },
      { id: 2, name: 'Project Beta', status: 'Completed' },
      // Add more projects as needed
    ],
    attendance: {
      '2023-10': [
        { date: '2023-10-01', hours: 8 },
        { date: '2023-10-02', hours: 7 },
        { date: '2023-10-03', hours: 8 },
        { date: '2023-10-04', hours: 6 },
        { date: '2023-10-05', hours: 9 },
        { date: '2023-10-06', hours: 5 },
        { date: '2023-10-07', hours: 8 },
        { date: '2023-10-08', hours: 7 },
        { date: '2023-10-09', hours: 8 },
        { date: '2023-10-10', hours: 6 },
        { date: '2023-10-11', hours: 9 },
        { date: '2023-10-12', hours: 5 },
        { date: '2023-10-13', hours: 8 },
        { date: '2023-10-14', hours: 7 },
        { date: '2023-10-15', hours: 8 },
        { date: '2023-10-16', hours: 8 },
        { date: '2023-10-17', hours: 7 },
        { date: '2023-10-18', hours: 8 },
        { date: '2023-10-19', hours: 6 },
        { date: '2023-10-20', hours: 9 },
        { date: '2023-10-21', hours: 5 },
        { date: '2023-10-22', hours: 8 },
        { date: '2023-10-23', hours: 7 },
        { date: '2023-10-24', hours: 8 },
        { date: '2023-10-25', hours: 6 },
        { date: '2023-10-26', hours: 9 },
        { date: '2023-10-27', hours: 5 },
        { date: '2023-10-28', hours: 8 },
        { date: '2023-10-29', hours: 7 },
        { date: '2023-10-30', hours: 8 },
        { date: '2023-10-31', hours: 8 },
      ],
      '2023-11': [
        { date: '2023-11-01', hours: 8 },
        { date: '2023-11-02', hours: 7 },
        { date: '2023-11-03', hours: 8 },
        { date: '2023-11-04', hours: 6 },
        { date: '2023-11-05', hours: 9 },
        { date: '2023-11-06', hours: 5 },
        { date: '2023-11-07', hours: 8 },
        { date: '2023-11-08', hours: 7 },
        { date: '2023-11-09', hours: 8 },
        { date: '2023-11-10', hours: 6 },
        { date: '2023-11-11', hours: 9 },
        { date: '2023-11-12', hours: 5 },
        { date: '2023-11-13', hours: 8 },
        { date: '2023-11-14', hours: 7 },
        { date: '2023-11-15', hours: 8 },
        { date: '2023-11-16', hours: 8 },
        { date: '2023-11-17', hours: 7 },
        { date: '2023-11-18', hours: 8 },
        { date: '2023-11-19', hours: 6 },
        { date: '2023-11-20', hours: 9 },
        { date: '2023-11-21', hours: 5 },
        { date: '2023-11-22', hours: 8 },
        { date: '2023-11-23', hours: 7 },
        { date: '2023-11-24', hours: 8 },
        { date: '2023-11-25', hours: 6 },
        { date: '2023-11-26', hours: 9 },
        { date: '2023-11-27', hours: 5 },
        { date: '2023-11-28', hours: 8 },
        { date: '2023-11-29', hours: 7 },
        { date: '2023-11-30', hours: 8 },
      ],
      // Add more months as needed
    },
  });

  const [currentMonth, setCurrentMonth] = useState('2023-10');

  const handleMonthChange = (direction) => {
    const [year, month] = currentMonth.split('-').map(Number);
    let newYear = year;
    let newMonth = month + direction;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    const newMonthStr = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    setCurrentMonth(newMonthStr);
  };

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    department: false,
  });

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e, field) => {
    setHrDetails({
      ...hrDetails,
      [field]: e.target.value,
    });
  };

  // Prepare data for the bar chart
  const attendanceData = {
    labels: hrDetails.attendance[currentMonth].map(record => record.date),
    datasets: [
      {
        label: 'Working Hours',
        data: hrDetails.attendance[currentMonth].map(record => record.hours),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        barThickness: 10, // Set minimal bar thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="hr-profile">
      <h1>HR Profile</h1>
      <div className="personal-details">
        <h2>Personal Details</h2>
        <div className="detail-container">
          <div className="detail">
            <strong>Name:</strong>
            {isEditing.name ? (
              <input
                type="text"
                value={hrDetails.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            ) : (
              <span>{hrDetails.name}</span>
            )}
            <span className="edit-icon" onClick={() => handleEditToggle('name')}>✏️</span>
          </div>
        </div>
        <div className="detail-container">
          <div className="detail">
            <strong>Email:</strong>
            {isEditing.email ? (
              <input
                type="email"
                value={hrDetails.email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
            ) : (
              <span>{hrDetails.email}</span>
            )}
            <span className="edit-icon" onClick={() => handleEditToggle('email')}>✏️</span>
          </div>
        </div>
        <div className="detail-container">
          <div className="detail">
            <strong>Phone:</strong>
            {isEditing.phone ? (
              <input
                type="text"
                value={hrDetails.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
              />
            ) : (
              <span>{hrDetails.phone}</span>
            )}
            <span className="edit-icon" onClick={() => handleEditToggle('phone')}>✏️</span>
          </div>
        </div>
        <div className="detail-container">
          <div className="detail">
            <strong>Department:</strong>
            {isEditing.department ? (
              <input
                type="text"
                value={hrDetails.department}
                onChange={(e) => handleInputChange(e, 'department')}
              />
            ) : (
              <span>{hrDetails.department}</span>
            )}
            <span className="edit-icon" onClick={() => handleEditToggle('department')}>✏️</span>
          </div>
        </div>
      </div>
      <div className="projects">
        <h2>Projects</h2>
        <ul>
          {hrDetails.projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> - {project.status}
            </li>
          ))}
        </ul>
      </div>
      <div className="attendance">
        <h2>Attendance</h2>
        <div className="attendance-chart-container">
          <Bar data={attendanceData} options={options} />
        </div>
        <div className="attendance-buttons">
          <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
          <button onClick={() => handleMonthChange(1)}>Next Month</button>
        </div>
      </div>
    </div>
  );
}

export default HRProfile;