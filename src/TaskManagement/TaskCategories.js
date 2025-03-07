import React, { useState } from 'react';
import { TextField, Button, IconButton, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

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
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom align="center">
          Task Categories
        </Typography>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={15} sm={8}>
            <TextField
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <ButtonStyled variant="contained" color="primary" onClick={handleAddCategory}>
              Add Category
            </ButtonStyled>
          </Grid>
        </Grid>
      </PaperStyled>
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <PaperStyled>
              {editIndex === index ? (
                <>
                  <TextField
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    fullWidth
                  />
                  <ButtonStyled variant="contained" color="primary" onClick={handleSaveEditCategory}>
                    Save
                  </ButtonStyled>
                </>
              ) : (
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography variant="h6">{category}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleEditCategory(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCategory(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </PaperStyled>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default TaskCategories;