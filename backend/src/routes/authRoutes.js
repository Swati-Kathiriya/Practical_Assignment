// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Route for user registration
// POST /api/auth/register
// Required fields in request body: name, email, password
router.post('/register', register);

// Route for user login
// POST /api/auth/login
// Required fields in request body: email, password
router.post('/login', login);

module.exports = router;