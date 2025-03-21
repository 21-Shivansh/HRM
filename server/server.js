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
    res.json(result);
  });
});

// Route to add a payment
app.post('/api/payments', (req, res) => {
  const { paid_amount, bank_name, utr, status, employee_id, date } = req.body; // Extract data from the request body
  
  const insertPaymentSql = 'INSERT INTO payments (paid_amount_, bank_name, utr, status, employee_id) VALUES (?, ?, ?, ?, ?)';
  const updateEmployeeStatusSql = 'UPDATE emp_data SET status = ? WHERE id = ?';

  db.query(insertPaymentSql, [paid_amount, bank_name, utr, status || 'Paid', employee_id, date], (err, result) => {
    if (err) {
      console.error('Database Error (Insert Payment):', err);
      return res.status(500).send(err);
    }

    console.log('Payment Added:', result);

    db.query(updateEmployeeStatusSql, ['Paid', employee_id], (err, updateResult) => {
      if (err) {
        console.error('Database Error (Update Employee Status):', err);
        return res.status(500).send(err);
      }

      console.log('Employee Status Updated:', updateResult);
      res.status(201).send('Payment added and employee status updated successfully');
    });
  });
});

// Run the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
