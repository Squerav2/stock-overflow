// models/Portfolio.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const getPortfolio = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM portfolio_items');
    return result.rows;
  } finally {
    client.release();
  }
};

const addToPortfolio = async (symbol, companyName, quantity, purchasePrice) => {
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO portfolio_items (symbol, company_name, quantity, purchase_price) VALUES ($1, $2, $3, $4) RETURNING *', [symbol, companyName, quantity, purchasePrice]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  getPortfolio,
  addToPortfolio,
};
