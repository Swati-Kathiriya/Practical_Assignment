const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register new user
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = new User({ email, password, name });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .status(201)
      .json({
        token,
        user: { id: user._id, email: user.email, name: user.name },
      });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Email is not registered",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error occurred during login",
      message: error.message,
    });
  }
};

module.exports = { register, login };
