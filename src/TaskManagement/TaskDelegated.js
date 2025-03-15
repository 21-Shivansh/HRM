import React, { useState } from 'react';
import './MyTasks.css';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RepeatIcon from '@mui/icons-material/Repeat';
import TaskDetailsModal from './MyTasksDetails';

import AssignNewTaskPopup from './AssignTasks'; // Import the new popup component


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

const TasksDelegated = () => {
  const [selectedButton, setSelectedButton] = useState('Upcoming');
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [priority, setPriority] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

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

  const handleAddNewTaskClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="taskmy-root">
      <div className="taskmy-sticky-grid">
        <button className="taskmy-add-button" onClick={handleAddNewTaskClick}>Add New Task</button> {/* Add New Task button */}
      
        <div className="taskmy-grid-item due-date">
          <button
            className={`taskmy-button ${selectedButton === 'Due Today' ? 'active' : ''}`}
            onClick={() => setSelectedButton('Due Today')}
          >
            Due Today
          </button>
        </div>
        <div className="taskmy-grid-item">
          <button
            className={`taskmy-button ${selectedButton === 'Due This Week' ? 'active' : ''}`}
            onClick={() => setSelectedButton('Due This Week')}
          >
            Due This Week
          </button>
        </div>
        <div className="taskmy-grid-item">
          <button
            className={`taskmy-button ${selectedButton === 'Upcoming' ? 'active' : ''}`}
            onClick={() => setSelectedButton('Upcoming')}
          >
            Upcoming
          </button>
        </div>
        <div className="taskmy-grid-item">
          <button
            className={`taskmy-button ${selectedButton === 'Completed' ? 'active' : ''}`}
            onClick={() => setSelectedButton('Completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="taskmy-sticky-grid" style={{ marginTop: '16px' }}>
        <div className="taskmy-grid-item">
          <label htmlFor="month" className="taskmy-label">Month</label>
          <select
            id="month"
            className="taskmy-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="March 25">March 25</option>
            <option value="April 25">April 25</option>
            <option value="May 25">May 25</option>
            <option value="June 25">June 25</option>
            <option value="July 25">July 25</option>
          </select>
        </div>
        <div className="taskmy-grid-item">
          <label htmlFor="category" className="taskmy-label">Category</label>
          <select
            id="category"
            className="taskmy-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Human Resources">Human Resources</option>
            <option value="IT Support">IT Support</option>
            <option value="Customer Testimonials">Customer Testimonials</option>
            <option value="Finance">Finance</option>
            <option value="Product Development">Product Development</option>
          </select>
        </div>
        <div className="taskmy-grid-item">
          <label htmlFor="assignedBy" className="taskmy-label">Assigned By</label>
          <select
            id="assignedBy"
            className="taskmy-select"
            value={assignedBy}
            onChange={(e) => setAssignedBy(e.target.value)}
          >
            <option value="Aagam Sheth">Aagam Sheth</option>
            <option value="Hrutika Mohal">Hrutika Mohal</option>
            <option value="Jahnvi Thakker">Jahnvi Thakker</option>
            <option value="Joyeeta Khaskel">Joyeeta Khaskel</option>
            <option value="Komal Bhanushali">Komal Bhanushali</option>
            <option value="Preshita Rane">Preshita Rane</option>
            <option value="Priyanka Panjwani">Priyanka Panjwani</option>
            <option value="Rajalaxmi Das">Rajalaxmi Das</option>
            <option value="Rashesh Doshi">Rashesh Doshi</option>
            <option value="Rushali Rajgor">Rushali Rajgor</option>
          </select>
        </div>
        <div className="taskmy-grid-item">
          <label htmlFor="priority" className="taskmy-label">Priority</label>
          <select
            id="priority"
            className="taskmy-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="taskmy-grid-item">
          <label htmlFor="frequency" className="taskmy-label">Frequency</label>
          <select
            id="frequency"
            className="taskmy-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="taskmy-scrollable-content">
        <div className="taskmy-grid" style={{ marginTop: '16px' }}>
          {filterTasks().map((task) => (
            <div className="taskmy-grid-item" key={task.id} onClick={() => handleTaskClick(task)}>
              <div className="taskmy-paper">
                <div className="taskmy-grid-task">
                  <div className="taskmy-grid-item task-deets">
                    <h6 className="taskmy-task-title">{task.name}</h6>
                    <p className="taskmy-task-subtitle">Assigned By {task.assignedBy}</p>
                    <div className="taskmy-grid">
                    <div className="taskmy-grid-item taskmy-detail-item">
                        <CalendarTodayIcon />
                        <p className="taskmy-task-detail">{task.deadline}</p>
                      </div>
                      <div className="taskmy-grid-item taskmy-detail-item">
                        {task.status === 'Completed' ? <CheckCircleIcon color="primary" /> : <PendingIcon color="secondary" />}
                        <p className="taskmy-task-detail">{task.status}</p>
                      </div>
                      <div className="taskmy-grid-item taskmy-detail-item">
                        <CategoryIcon />
                        <p className="taskmy-task-detail">{task.category}</p>
                      </div>
                      <div className="taskmy-grid-item taskmy-detail-item">
                        <PriorityHighIcon style={{ color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green' }} />
                        <p className="taskmy-task-detail">{task.priority}</p>
                      </div>
                      {task.repeat && (
                        <div className="taskmy-grid-item taskmy-detail-item">
                          <RepeatIcon />
                          <p className="taskmy-task-detail">{task.repeat}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="taskmy-grid-item taskmy-buttons">
                    <button className="taskmy-small-button taskmy-in-progress-button">In Progress</button>
                    <button className="taskmy-small-button taskmy-completed-button">Completed</button>
                    <button className="taskmy-small-button taskmy-delete-button">Delete Task</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <TaskDetailsModal
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          selectedTask={selectedTask}
        />
      )}

      {isPopupOpen && (
        <AssignNewTaskPopup handleClose={handleClosePopup} />
      )}

    </div>
  );
};

export default TasksDelegated;