// backend/models/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',       
  port: 3307,             
  user: 'root',
  password: '',            
  database: 'fitpage_reviews',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Error:', err.message);
  } else {
    console.log(' Connected to MySQL Database.');
  }
});

module.exports = db;
