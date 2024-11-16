const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'ecommerce',
  password: 'password',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
