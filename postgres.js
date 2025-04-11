const { Pool } = require('pg');

const pool = new Pool();

async function initPostgres() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
}

async function addUser(name) {
  const res = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
  return res.rows[0];
}

async function getUsers() {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
}

module.exports = { initPostgres, addUser, getUsers };
