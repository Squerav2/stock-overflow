// models/Watchlist.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const getWatchlist = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM watchlist_items');
    return result.rows;
  } finally {
    client.release();
  }
};

const addToWatchlist = async (symbol, companyName) => {
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO watchlist_items (symbol, company_name) VALUES ($1, $2) RETURNING *', [symbol, companyName]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
};
