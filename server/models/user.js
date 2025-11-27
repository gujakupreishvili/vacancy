const pool = require("../config/db");

const createUser = async (name, email, phone, vacancyId) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, phone, vacancy_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone, vacancy_id, created_at`,
    [name, email, phone, vacancyId]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, vacancy_id, created_at 
     FROM users 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

module.exports = { createUser, getAllUsers };