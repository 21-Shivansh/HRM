import React, { useState, useEffect } from 'react';
import './MyTasksDetails.css';

const TaskDetailsModal = ({ isModalOpen, handleClose, selectedTask }) => {
  const [taskUpdates, setTaskUpdates] = useState([]);
  const [updateText, setUpdateText] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTaskUpdates(selectedTask.updates || []);
    }
  }, [selectedTask]);

  useEffect(() => {
    const modal = document.querySelector('.taskdetails-modal-overlay');
    if (isModalOpen) {
      modal.classList.add('open');
    } else {
      modal.classList.remove('open');
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="taskdetails-modal-overlay">
      <div className="taskdetails-modal">
        <button className="taskdetails-close-button" onClick={handleClose}>Close</button>
        {selectedTask && (
          <>
            <h2 className="taskdetails-title">{selectedTask.name}</h2>
            <ul className="taskdetails-list">
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">📄</span>
                <div>
                  <strong>Description:</strong>
                  <p>{selectedTask.description || 'No description provided'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">👤</span>
                <div>
                  <strong>Assigned To:</strong>
                  <p>{Array.isArray(selectedTask.assignedTo) ? selectedTask.assignedTo.join(', ') : 'No assignees'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">📂</span>
                <div>
                  <strong>Category:</strong>
                  <p>{Array.isArray(selectedTask.category) ? selectedTask.category.join(', ') : 'No categories'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">📅</span>
                <div>
                  <strong>Deadline:</strong>
                  <p>{selectedTask.deadline || 'No deadline'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">🔁</span>
                <div>
                  <strong>Repeat:</strong>
                  <p>{selectedTask.repeat ? `Every ${selectedTask.repeatFrequency}` : 'No repeat'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">📎</span>
                <div>
                  <strong>Attachments:</strong>
                  <p>{Array.isArray(selectedTask.attachments) ? selectedTask.attachments.join(', ') : 'No attachments'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">⚠️</span>
                <div>
                  <strong>Priority:</strong>
                  <p style={{ color: selectedTask.priority === 'High' ? 'red' : selectedTask.priority === 'Medium' ? 'orange' : 'green' }}>
                    {selectedTask.priority || 'No priority'}
                  </p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">🎤</span>
                <div>
                  <strong>Voice Notes:</strong>
                  <p>{Array.isArray(selectedTask.voiceNotes) ? selectedTask.voiceNotes.join(', ') : 'No voice notes'}</p>
                </div>
              </li>
              <li className="taskdetails-list-item">
                <span className="taskdetails-list-item-icon">🔄</span>
                <div>
                  <strong>Updates:</strong>
                  <ul>
                    {taskUpdates.map((update, index) => (
                      <li key={index} className="taskdetails-update-item">
                        <span>{update.text}</span>
                        <span>{update.timestamp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div className="taskdetails-update-section">
              <textarea
                className="taskdetails-update-input"
                placeholder="Update Task Status"
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
              />
              <button
                className="taskdetails-update-button"
                onClick={() => {
                  const timestamp = new Date().toLocaleString();
                  setTaskUpdates([...taskUpdates, { text: updateText, timestamp }]);
                  setUpdateText('');
                }}
              >
                Add Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;