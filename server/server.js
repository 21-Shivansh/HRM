const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch employees
app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM emp_data';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).send(err);
    }
    console.log('Query Result:', result);
    res.json(result);
  });
});

// Run the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
