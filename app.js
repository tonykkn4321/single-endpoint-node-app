require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Set up the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Use this only for production
  }
});

// Endpoint to get authors
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});