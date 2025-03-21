const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Use environment variable for host
  user: process.env.DB_USER,       // Use environment variable for user
  password: process.env.DB_PASSWORD, // Use environment variable for password
  database: 'crm'    // Use environment variable for database name
});

db.connect((err) => {
  if (err) {
    console.log('DB connection error:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

module.exports = db;