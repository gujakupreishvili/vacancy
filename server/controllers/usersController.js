const { getAllUsers } = require("../models/user");

const allUser = async (req, res) => {
  try {
    const users = await getAllUsers();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("GetUsers Error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch users" 
    });
  }
};

module.exports = { allUser };