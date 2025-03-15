import React, { useState } from 'react';
import './TaskDashboard.css';

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
    <div className="taskdash-root">
      <h1 className="taskdash-title">Task Dashboard</h1>
      <div className="taskdash-form-control">
        <label htmlFor="month" className="taskdash-label">Month</label>
        <select id="month" className="taskdash-select" value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="March 25">March 25</option>
          <option value="April 25">April 25</option>
          <option value="May 25">May 25</option>
          <option value="June 25">June 25</option>
          <option value="July 25">July 25</option>
        </select>
      </div>

      <div className="taskdash-grid">
        <div className="taskdash-stat-box taskdash-pending">
          <h2 className="taskdash-stat-title">Pending</h2>
          <p className="taskdash-stat-value">10</p>
        </div>
        <div className="taskdash-stat-box taskdash-in-progress">
          <h2 className="taskdash-stat-title">In Progress</h2>
          <p className="taskdash-stat-value">5</p>
        </div>
        <div className="taskdash-stat-box taskdash-completed">
          <h2 className="taskdash-stat-title">Completed</h2>
          <p className="taskdash-stat-value">15</p>
        </div>
        <div className="taskdash-stat-box">
          <h2 className="taskdash-stat-title">Total</h2>
          <p className="taskdash-stat-value">30</p>
        </div>
      </div>

      <div className="taskdash-grid">
        <div className="taskdash-section">
          <h2 className="taskdash-section-title">Category Report</h2>
          <div className="taskdash-scrollable-list">
            {categories.map((category, index) => (
              <div className="taskdash-list-item-wrapper" key={index}>
                <div className={`taskdash-completion-circle taskdash-${getColor(60)}`}>
                  <p className="taskdash-completion-text">60%</p>
                </div>
                <div className="taskdash-list-item-text">
                  <p className="taskdash-list-item-primary">{category}</p>
                  <p className="taskdash-list-item-secondary">Tasks: 3/5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="taskdash-section">
          <h2 className="taskdash-section-title">Team Performance</h2>
          <div className="taskdash-scrollable-list">
            {employees.map((employee, index) => (
              <div className="taskdash-list-item-wrapper" key={index}>
                <div className={`taskdash-completion-circle taskdash-${getColor(80)}`}>
                  <p className="taskdash-completion-text">80%</p>
                </div>
                <div className="taskdash-list-item-text">
                  <p className="taskdash-list-item-primary">{employee}</p>
                  <p className="taskdash-list-item-secondary">Tasks: 4/5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;