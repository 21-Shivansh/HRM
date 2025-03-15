import React, { useState } from 'react';
import './TaskTemplate.css';
import TemplateList from './TemplateList';

const TaskTemplate = () => {
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const employeeOptions = [
    { id: 'E001', name: 'Aagam Sheth' },
    { id: 'E002', name: 'Avadai Marthuvar' },
    { id: 'E003', name: 'Hrutika Mohal' },
    { id: 'E004', name: 'Jahnvi Thakker' },
    { id: 'E005', name: 'Joyeeta Khaskel' },
    { id: 'E006', name: 'Komal Bhanushali' },
    { id: 'E007', name: 'Preshita Rane' },
    { id: 'E008', name: 'Priyanka Panjwani' },
    { id: 'E009', name: 'Rajalaxmi Das' },
    { id: 'E010', name: 'Rashesh Doshi' },
    { id: 'E011', name: 'Rushali Rajgor' },
    { id: 'E012', name: 'Snehal kadu' },
    { id: 'E013', name: 'Surbhi Jain' },
    { id: 'E014', name: 'Vaishnavi Bhagat' },
    { id: 'E015', name: 'Vedika Tolani' },
    { id: 'E016', name: 'Jagruti Doshi' },
    { id: 'E017', name: 'Kajal Khamkar' },
    { id: 'E018', name: 'Nishi Doshi' },
    { id: 'E019', name: 'Deepti Singh' },
    { id: 'E020', name: 'Bankim Doshi' },
    { id: 'E021', name: 'Nita Doshi' },
    { id: 'E022', name: 'Pragya Doshi' },
    { id: 'E023', name: 'Chaitali Doshi' },
    { id: 'E024', name: 'Preeti Doshi' },
    { id: 'E025', name: 'Kinjal Patel' },
    { id: 'E026', name: 'Minal Sanghvi' },
    { id: 'E027', name: 'Jigna Sanghvi' },
    { id: 'E028', name: 'SAUMYA KIRIT GALA' },
    { id: 'E029', name: 'Shreya Santosh Talashilkar' },
  ];

  const categories = [
    { name: 'Customer Support', templates: 4 },
    { name: 'Focus Branch', templates: 1 },
    { name: 'CRM', templates: 5 },
    { name: 'Payment Followup', templates: 6 },
    { name: 'Franchisee', templates: 3 },
    { name: 'Accounts', templates: 2 },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="tasktemplate-root">
      <div className="tasktemplate-header">
        <div className="tasktemplate-dropdown">
          <label htmlFor="createdBy">Created By</label>
          <select
            id="createdBy"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          >
            <option value="">Select</option>
            {employeeOptions.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="tasktemplate-dropdown">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button className="tasktemplate-add-button">Add New</button>
      </div>
      <div className="tasktemplate-categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`tasktemplate-category-button ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <TemplateList category={selectedCategory} />
    </div>
  );
};

export default TaskTemplate;