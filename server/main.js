const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "File is too large. Maximum size is 5MB"
      });
    }
  }
  
  if (err.message === "Only PDF files are allowed!") {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
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