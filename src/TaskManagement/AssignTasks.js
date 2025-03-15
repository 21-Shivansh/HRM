import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AssignTasks.css';

const AssignTasks = ({ handleClose, template }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [category, setCategory] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [recordedDuration, setRecordedDuration] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const employeeOptions = [
    { value: 'Aagam Sheth', label: 'Aagam Sheth' },
    { value: 'Avadai Marthuvar', label: 'Avadai Marthuvar' },
    { value: 'Hrutika Mohal', label: 'Hrutika Mohal' },
    { value: 'Jahnvi Thakker', label: 'Jahnvi Thakker' },
    { value: 'Joyeeta Khaskel', label: 'Joyeeta Khaskel' },
    { value: 'Komal Bhanushali', label: 'Komal Bhanushali' },
    { value: 'Preshita Rane', label: 'Preshita Rane' },
    { value: 'Priyanka Panjwani', label: 'Priyanka Panjwani' },
    { value: 'Rajalaxmi Das', label: 'Rajalaxmi Das' },
    { value: 'Rashesh Doshi', label: 'Rashesh Doshi' },
    { value: 'Rushali Rajgor', label: 'Rushali Rajgor' },
    { value: 'Snehal kadu', label: 'Snehal kadu' },
    { value: 'Surbhi Jain', label: 'Surbhi Jain' },
    { value: 'Vaishnavi Bhagat', label: 'Vaishnavi Bhagat' },
    { value: 'Vedika Tolani', label: 'Vedika Tolani' },
    { value: 'Jagruti Doshi', label: 'Jagruti Doshi' },
    { value: 'Kajal Khamkar', label: 'Kajal Khamkar' },
    { value: 'Nishi Doshi', label: 'Nishi Doshi' },
    { value: 'Deepti Singh', label: 'Deepti Singh' },
    { value: 'Bankim Doshi', label: 'Bankim Doshi' },
    { value: 'Nita Doshi', label: 'Nita Doshi' },
    { value: 'Pragya Doshi', label: 'Pragya Doshi' },
    { value: 'Chaitali Doshi', label: 'Chaitali Doshi' },
    { value: 'Preeti Doshi', label: 'Preeti Doshi' },
    { value: 'Kinjal Patel', label: 'Kinjal Patel' },
    { value: 'Minal Sanghvi', label: 'Minal Sanghvi' },
    { value: 'Jigna Sanghvi', label: 'Jigna Sanghvi' },
    { value: 'SAUMYA KIRIT GALA', label: 'SAUMYA KIRIT GALA' },
    { value: 'Shreya Santosh Talashilkar', label: 'Shreya Santosh Talashilkar' }
  ];

  const categoryOptions = [
    { value: 'Customer Testimonials', label: 'Customer Testimonials' },
    { value: 'Accounts', label: 'Accounts' },
    { value: 'Customer Referrals', label: 'Customer Referrals' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Product Development', label: 'Product Development' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'IT Support', label: 'IT Support' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Project Management', label: 'Project Management' },
    { value: 'Research and Development', label: 'Research and Development' }
  ];

  useEffect(() => {
    if (template) {
      setTaskTitle(template.name);
      setDescription(template.description);
      setCategory([template.category]);
      setDeadline(`${template.date}T${template.time}`);
      setRepeat(!!template.repeat);
      setRepeatFrequency(template.repeat);
      setPriority(template.priority.toLowerCase());
    }
  }, [template]);

  const handleAssignTask = () => {
    // Logic to handle task assignment
    console.log('Task assigned:', {
      taskTitle,
      description,
      assignedTo,
      category,
      deadline,
      repeat,
      attachments,
      voiceNotes,
      priority,
    });

    // Show Snackbar
    setOpenSnackbar(true);

    // Reset the form
    setTaskTitle('');
    setDescription('');
    setAssignedTo([]);
    setCategory([]);
    setDeadline('');
    setRepeat(false);
    setAttachments([]);
    setPriority('medium');
    setRecording(false);
    setRecordingTime(0);
    setVoiceNotes([]);
    setRecordedDuration(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const handleRecordVoiceNote = () => {
    setRecording(true);
    setRecordingTime(0);
    setRecordedDuration(null);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setVoiceNotes([...voiceNotes, recordingTime]);
    setRecordedDuration(recordingTime);
  };

  const formatTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleDeleteAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleDeleteVoiceNote = (index) => {
    setVoiceNotes(voiceNotes.filter((_, i) => i !== index));
  };

  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!recording && recordingTime !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [recording]);

  return (
    <div className="popup-overlay taskassign-root">
      <div className=" popup-content taskassign-paper">
        <h4 className="taskassign-title">Assign New Task</h4>
        <button className="popup-close-button" onClick={handleClose}>Close</button>
        <form noValidate autoComplete="off">
          <div className="taskassign-grid">
            <div className="taskassign-grid-item">
              <label htmlFor="taskTitle" className="taskassign-label">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                name="taskTitle"
                className="taskassign-input"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="taskassign-grid-item">
              <label htmlFor="description" className="taskassign-label">Short Description of the Task</label>
              <input
                type="text"
                id="description"
                name="description"
                className="taskassign-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="taskassign-grid-item">
              <label htmlFor="assignedTo" className="taskassign-label">Select User</label>
              <Select
                id="assignedTo"
                name="assignedTo"
                className="taskassign-select"
                isMulti
                options={employeeOptions}
                value={employeeOptions.filter(option => assignedTo.includes(option.value))}
                onChange={(selectedOptions) => setAssignedTo(selectedOptions.map(option => option.value))}
              />
            </div>
            <div className="taskassign-grid-item">
              <label htmlFor="category" className="taskassign-label">Select Category</label>
              <Select
                id="category"
                name="category"
                className="taskassign-select"
                isMulti
                options={categoryOptions}
                value={categoryOptions.filter(option => category.includes(option.value))}
                onChange={(selectedOptions) => setCategory(selectedOptions.map(option => option.value))}
              />
            </div>
            <div className="taskassign-grid-item">
              <label htmlFor="deadline" className="taskassign-label">Deadline</label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                className="taskassign-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="taskassign-grid-item">
              <label className="taskassign-checkbox-label">
                <input
                  type="checkbox"
                  checked={repeat}
                  onChange={(e) => setRepeat(e.target.checked)}
                  name="repeat"
                  className="taskassign-checkbox"
                />
                Repeat
              </label>
            </div>
            {repeat && (
              <div className="taskassign-grid-item">
                <label htmlFor="repeatFrequency" className="taskassign-label">Repeat Frequency</label>
                <select
                  id="repeatFrequency"
                  name="repeatFrequency"
                  className="taskassign-select"
                  value={repeatFrequency}
                  onChange={(e) => setRepeatFrequency(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            )}
            <div className="taskassign-grid-item">
              <h6 className="taskassign-subtitle">Priority</h6>
              <div className="taskassign-toggle-group">
                <button
                  type="button"
                  className={`taskassign-toggle-button ${priority === 'high' ? 'active' : ''}`}
                  onClick={() => setPriority('high')}
                >
                  High
                </button>
                <button
                  type="button"
                  className={`taskassign-toggle-button ${priority === 'medium' ? 'active' : ''}`}
                  onClick={() => setPriority('medium')}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`taskassign-toggle-button ${priority === 'low' ? 'active' : ''}`}
                  onClick={() => setPriority('low')}
                >
                  Low
                </button>
              </div>
            </div>
            <div className="taskassign-grid-item">
              <label className="taskassign-button taskassign-upload-button">
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              {attachments && attachments.length > 0 && (
                <div className="taskassign-attachments">
                  {attachments.map((file, index) => (
                    <div key={index} className="taskassign-attachment">
                      {file.name}
                      <button type="button" className="taskassign-delete-button" onClick={() => handleDeleteAttachment(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="taskassign-grid-item">
              {recording ? (
                <button
                  type="button"
                  className="taskassign-button taskassign-stop-button"
                  onClick={handleStopRecording}
                >
                  Recording... {formatTime(recordingTime)}
                </button>
              ) : (
                <button
                  type="button"
                  className="taskassign-button taskassign-record-button"
                  onClick={handleRecordVoiceNote}
                >
                  Record Voice Note
                </button>
              )}
            </div>
            {voiceNotes && voiceNotes.length > 0 && (
              <div className="taskassign-grid-item">
                {voiceNotes.map((duration, index) => (
                  <div key={index} className="taskassign-voice-note">
                    Voice Note Duration: {formatTime(duration)}
                    <button type="button" className="taskassign-delete-button" onClick={() => handleDeleteVoiceNote(index)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="taskassign-grid-item">
              <button
                type="button"
                className="taskassign-button taskassign-assign-button"
                onClick={handleAssignTask}
              >
                Assign Task
              </button>
            </div>
          </div>
        </form>
        {openSnackbar && (
          <div className="taskassign-snackbar">
            <div className="taskassign-alert">
              Task Delegated
              <button type="button" className="taskassign-close-button" onClick={handleCloseSnackbar}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignTasks;