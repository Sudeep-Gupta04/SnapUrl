const express = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');
const { RegisterRequest, LoginRequest } = require('../dtos/authDTO');

const router = express.Router();

// Validation middleware
const validateRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Register endpoint
router.post('/public/register', validateRegister, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const registerRequest = new RegisterRequest(req.body);
    await userService.registerUser(registerRequest);
    
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
router.post('/public/login', validateLogin, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const loginRequest = new LoginRequest(req.body);
    const jwtResponse = await userService.authenticateUser(loginRequest);
    
    res.status(200).json(jwtResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 