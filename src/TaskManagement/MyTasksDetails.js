import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RepeatIcon from '@mui/icons-material/Repeat';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';

const modalStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  transition: 'transform 0.3s ease-in-out',
  transform: 'translateX(100%)',
};

const modalOpenStyle = {
  transform: 'translateX(0)',
};

const TaskDetailsModal = ({ isModalOpen, handleClose, selectedTask }) => {
  const [taskUpdates, setTaskUpdates] = useState([]);
  const [updateText, setUpdateText] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTaskUpdates(selectedTask.updates || []);
    }
  }, [selectedTask]);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="task-details-title"
      aria-describedby="task-details-description"
      sx={{ overflow: 'hidden' }}
    >
      <Box sx={{ ...modalStyle, ...(isModalOpen && modalOpenStyle) }}>
        {selectedTask && (
          <>
            <Typography id="task-details-title" variant="h6" component="h2">
              {selectedTask.name}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Description" secondary={selectedTask.description || 'No description provided'} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Assigned To" secondary={
                    <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-line' }}>
                    {Array.isArray(selectedTask.assignedTo) ? selectedTask.assignedTo.join('\n') : 'No assignees'}
                    </Typography>
                } />
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" secondary={
                    <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-line' }}>
                    {Array.isArray(selectedTask.category) ? selectedTask.category.join('\n') : 'No categories'}
                    </Typography>
                } />
                </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Deadline" secondary={selectedTask.deadline || 'No deadline'} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RepeatIcon />
                </ListItemIcon>
                <ListItemText primary="Repeat" secondary={selectedTask.repeat ? `Every ${selectedTask.repeatFrequency}` : 'No repeat'} />
              </ListItem>
              <ListItem>
            <ListItemIcon>
                <AttachFileIcon />
            </ListItemIcon>
            <ListItemText primary="Attachments" secondary={
                <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-line' }}>
                {Array.isArray(selectedTask.attachments) ? selectedTask.attachments.join('\n') : 'No attachments'}
                </Typography>
            } />
            </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PriorityHighIcon style={{ color: selectedTask.priority === 'High' ? 'red' : selectedTask.priority === 'Medium' ? 'orange' : 'green' }} />
                </ListItemIcon>
                <ListItemText primary="Priority" secondary={selectedTask.priority || 'No priority'} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                    <MicIcon />
                </ListItemIcon>
                <ListItemText primary="Voice Notes" secondary={
                    <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-line' }}>
                    {Array.isArray(selectedTask.voiceNotes) ? selectedTask.voiceNotes.join('\n') : 'No voice notes'}
                    </Typography>
                } />
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <UpdateIcon />
                </ListItemIcon>
                <ListItemText primary="Updates" />
                </ListItem>
                <Box sx={{ pl: 7 }}>
                {taskUpdates.map((update, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: -3, marginBottom: -1  }}>
                    <ListItemText secondary={
                        <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'pre-line' }}>
                        {update.text}
                        </Typography>
                    } sx={{ flex: '1 1 auto' }} />
                    <Typography variant="body2" color="textSecondary" sx={{ flex: '0 0 auto', marginLeft: '16px' }}>
                        {update.timestamp}
                    </Typography>
                    </ListItem>
                ))}
                </Box>
            </List>

            <Box sx={{ mt: 2, mb: 8 }}>
              <TextField
                label="Update Task Status"
                variant="outlined"
                fullWidth
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                    const timestamp = new Date().toLocaleString();
                    setTaskUpdates([...taskUpdates, { text: updateText, timestamp }]);
                    setUpdateText('');
                    }}
                >
                    Add Update
                </Button>
                </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailsModal;