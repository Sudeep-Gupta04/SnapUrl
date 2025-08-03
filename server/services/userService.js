const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { JwtAuthenticationResponse } = require('../dtos/authDTO');

const prisma = new PrismaClient();

class UserService {
  async registerUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: userData.username },
            { email: userData.email }
          ]
        }
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'ROLE_ADMIN'
        }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser(loginRequest) {
    try {
      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username: loginRequest.username }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(loginRequest.password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          sub: user.username,
          roles: user.role
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: parseInt(process.env.JWT_EXPIRATION) / 1000 // Convert to seconds
        }
      );

      return new JwtAuthenticationResponse(token);
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username) {
    try {
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        throw new Error(`User with username: ${username} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService(); 