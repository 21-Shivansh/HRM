const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure the employee_leaves table exists
const createLeavesTable = `
  CREATE TABLE IF NOT EXISTS employee_leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    availed_leaves INT DEFAULT 0,
    add_on_leaves INT DEFAULT 0,
    unpaid_leaves INT DEFAULT 0,
    FOREIGN KEY (employee_id) REFERENCES emp_data(id) ON DELETE CASCADE
  )
`;
db.query(createLeavesTable, (err) => {
  if (err) console.error('Error creating employee_leaves table:', err);
});

// Fetch employees along with their leaves for the selected month
app.get('/api/employees', (req, res) => {
  const { month, year } = req.query;

  const sql = `
    SELECT e.id, e.name, e.salary, 
           COALESCE(l.unpaid_leaves, 0) AS unpaid_leaves, 
           COALESCE(l.availed_leaves, 0) AS availed_leaves, 
           COALESCE(prev_l.add_on_leaves, 0) AS add_on_leaves
    FROM emp_data e
    LEFT JOIN employee_leaves l 
      ON e.id = l.employee_id AND l.month = ? AND l.year = ?
    LEFT JOIN employee_leaves prev_l
      ON e.id = prev_l.employee_id 
      AND prev_l.year = ? 
      AND prev_l.month = (SELECT CASE 
                                  WHEN ? = 'January' THEN 'December' 
                                  ELSE DATE_FORMAT(STR_TO_DATE(CONCAT('1 ', ?, ' 2000'), '%d %M %Y') - INTERVAL 1 MONTH, '%M') 
                               END)
  `;

  db.query(sql, [month, year, year, month, month], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


// Route to update employee leaves
app.put('/api/employees/update-leaves', (req, res) => {
  const { employee_id, month, year, availed_leaves, add_on_leaves, unpaid_leaves } = req.body;

  console.log(`Updating Leaves for Employee ${employee_id} - ${month} ${year}`);
  console.log(`Availed: ${availed_leaves}, Add-on: ${add_on_leaves}, Unpaid: ${unpaid_leaves}`);

  const updateLeavesSql = `
    INSERT INTO employee_leaves (employee_id, month, year, availed_leaves, add_on_leaves, unpaid_leaves)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      availed_leaves = VALUES(availed_leaves),
      add_on_leaves = VALUES(add_on_leaves),
      unpaid_leaves = VALUES(unpaid_leaves)
  `;

  db.query(updateLeavesSql, [employee_id, month, year, availed_leaves, add_on_leaves, unpaid_leaves], (err, result) => {
    if (err) {
      console.error('SQL Error:', err.sqlMessage);
      return res.status(500).send(err);
    }
    console.log('Employee leave data updated successfully');
    res.status(200).send('Employee leave data updated successfully');
  });
});


// Route to add a payment
app.post('/api/payments', (req, res) => {
  const { paid_amount, bank_name, utr, status, employee_id, date } = req.body;

  const insertPaymentSql = 'INSERT INTO payments (paid_amount, bank_name, utr, status, employee_id, date) VALUES (?, ?, ?, ?, ?, ?)';
  const updateEmployeeStatusSql = 'UPDATE emp_data SET status = ? WHERE id = ?';

  db.query(insertPaymentSql, [paid_amount, bank_name, utr, status || 'Paid', employee_id, date], (err, result) => {
    if (err) {
      console.error('Database Error (Insert Payment):', err);
      return res.status(500).send(err);
    }

    db.query(updateEmployeeStatusSql, ['Paid', employee_id], (err, updateResult) => {
      if (err) {
        console.error('Database Error (Update Employee Status):', err);
        return res.status(500).send(err);
      }

      res.status(201).send('Payment added and employee status updated successfully');
    });
  });
});

// Run the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
