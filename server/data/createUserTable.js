const pool = require("../config/db");

(async () => {
  try {
    console.log("Creating users table...");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        vacancy_id INTEGER NOT NULL
      )
    `);
    
    console.log("Users table created successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" DB Initialization Error:", error); 
    process.exit(1);
  }
})();