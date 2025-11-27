const { registerSchema } = require("../validation/auth");
const { createUser } = require("../models/user");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false,
      error: error.details[0].message 
    });
  }

  const { name, email, phone, vacancyId } = req.body;

  try {
    const user = await createUser(name, email, phone, vacancyId);
    
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        vacancyId: user.vacancy_id
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to submit application" 
    });
  }
};

module.exports = { register };