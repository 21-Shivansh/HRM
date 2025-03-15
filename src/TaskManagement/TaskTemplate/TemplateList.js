import React, { useState } from 'react';
import './TemplateList.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignTasks from '../AssignTasks'; 

const templates = [
  {
    id: 1,
    name: 'Customer Query Resolution',
    createdBy: 'Aagam Sheth',
    date: '2025-03-07',
    time: '10:00',
    priority: 'High',
    description: 'Lorem ipsum random text',
    category: 'Customer Support',
    repeat: 'Weekly',
  },
  {
    id: 2,
    name: 'CRM Updates To Be Done',
    createdBy: 'Hrutika Mohal',
    date: '2025-03-08',
    time: '14:00',
    priority: 'Medium',
    description: 'Description for Template 2',
    category: 'CRM',
    repeat: 'Monthly',
  },
  {
    id: 3,
    name: 'Monthly Financial Report',
    createdBy: 'Jahnvi Thakker',
    date: '2025-03-09',
    time: '09:00',
    priority: 'High',
    description: 'Prepare and submit the monthly financial report.',
    category: 'Finance',
    repeat: 'Monthly',
  },
  {
    id: 4,
    name: 'Employee Onboarding',
    createdBy: 'Joyeeta Khaskel',
    date: '2025-03-10',
    time: '11:00',
    priority: 'Medium',
    description: 'Complete the onboarding process for new employees.',
    category: 'Human Resources',
    repeat: 'Weekly',
  },
  {
    id: 5,
    name: 'Website Content Update',
    createdBy: 'Komal Bhanushali',
    date: '2025-03-11',
    time: '15:00',
    priority: 'Low',
    description: 'Update the content on the company website.',
    category: 'Marketing',
    repeat: 'Monthly',
  },
  {
    id: 6,
    name: 'Client Feedback Review',
    createdBy: 'Preshita Rane',
    date: '2025-03-12',
    time: '13:00',
    priority: 'High',
    description: 'Review and analyze client feedback for improvements.',
    category: 'Customer Testimonials',
    repeat: 'Quarterly',
  }
];

const TemplateList = ({ category }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State to manage selected template

  const filteredTemplates = category ? templates.filter(template => template.category === category) : templates;

  const handleCheckCircleClick = (template) => {
    setSelectedTemplate(template);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="template-list">
      {filteredTemplates.map((template) => (
        <div className="template-item" key={template.id}>
          <div className="template-header">
            <h6 className="template-title">{template.name}</h6>
            <div className="template-icons">
              <CheckCircleIcon className="template-icon" onClick={() => handleCheckCircleClick(template)} />
              <EditIcon className="template-icon" />
              <DeleteIcon className="template-icon" />
            </div>
          </div>
          <div className="template-details">
            <p className="template-detail"><strong>Created By:</strong> {template.createdBy}</p>
            <p className="template-detail"><strong>Date:</strong> {template.date}</p>
            <p className="template-detail"><strong>Time:</strong> {template.time}</p>
            <p className="template-detail"><strong>Priority:</strong> <span className={`priority-${template.priority.toLowerCase()}`}>{template.priority}</span></p>
          </div>
          <p className="template-description"><strong>Description: </strong>{template.description}</p>
          <div className="template-footer">
            <p className="template-category"><strong>Category:</strong> {template.category}</p>
            <p className="template-repeat"><strong>Repeat:</strong> {template.repeat}</p>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <AssignTasks handleClose={handleClosePopup} template={selectedTemplate} /> // Pass the selected template data
      )}
    </div>
  );
};

export default TemplateList;