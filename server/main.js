const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ 
      message: "Server is running", 
      dbTime: result.rows[0].now,
      status: "connected"
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);


app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ 
    success: false, 
    error: "Internal server error" 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});