import React, { useState } from 'react';
import './TaskCategories.css';

const TaskCategories = () => {
  const [categories, setCategories] = useState([
    'Customer Testimonials',
    'Accounts',
    'Customer Referrals',
    'Marketing',
    'Sales',
    'Product Development',
    'Human Resources',
    'IT Support',
    'Legal',
    'Compliance',
    'Operations',
    'Administration',
    'Finance',
    'Project Management',
    'Research and Development'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCategory, setEditCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
    setEditCategory(categories[index]);
  };

  const handleSaveEditCategory = () => {
    const updatedCategories = [...categories];
    updatedCategories[editIndex] = editCategory;
    setCategories(updatedCategories);
    setEditIndex(null);
    setEditCategory('');
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="taskcategories-root">
      <div className="taskcategories-paper">
        <h4 className="taskcategories-title">Task Categories</h4>
        <div className="taskcategories-form">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="taskcategories-input"
          />
          <button onClick={handleAddCategory} className="taskcategories-button">
            Add Category
          </button>
        </div>
      </div>
      <div className="taskcategories-grid">
        {categories.map((category, index) => (
          <div className="taskcategories-grid-item" key={index}>
            <div className="taskcategories-paper">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="taskcategories-input"
                  />
                  <button onClick={handleSaveEditCategory} className="taskcategories-button">
                    Save
                  </button>
                </>
              ) : (
                <div className="taskcategories-item">
                  <span className="taskcategories-item-text">{category}</span>
                  <div className="taskcategories-item-buttons">
                    <button onClick={() => handleEditCategory(index)} className="taskcategories-icon-button">
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteCategory(index)} className="taskcategories-icon-button">
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCategories;