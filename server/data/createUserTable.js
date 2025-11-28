const pool = require("../config/db");

(async () => {
  try {
    console.log("Creating users table...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(50) NOT NULL,
         vacancy_id INTEGER NOT NULL,
         cv_path VARCHAR(500),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Users table created successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" DB Initialization Error:", error);
    process.exit(1);
  }
})();