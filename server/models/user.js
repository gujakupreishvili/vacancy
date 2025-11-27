const pool = require("../config/db");

const createUser = async (name, email, phone, vacancyId, cvPath) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, phone, vacancy_id, cv_path)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, vacancy_id, cv_path, created_at`,
    [name, email, phone, vacancyId, cvPath]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, vacancy_id, cv_path, created_at 
     FROM users 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

module.exports = { createUser, getAllUsers };