const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireRole } = require('../middleware/auth');
const urlMappingService = require('../services/urlMappingService');
const userService = require('../services/userService');

const router = express.Router();

// Validation middleware
const validateShortenUrl = [
  body('originalUrl').isURL().withMessage('Valid URL is required')
];

// Create short URL endpoint
router.post('/shorten', authenticateToken, requireRole('ROLE_ADMIN'), validateShortenUrl, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { originalUrl } = req.body;
    const user = req.user;

    const urlMappingDTO = await urlMappingService.createShortUrl(originalUrl, user);
    res.status(200).json(urlMappingDTO);
  } catch (error) {
    next(error);
  }
});

// Get user's URLs endpoint
router.get('/myurls', authenticateToken, requireRole('ROLE_ADMIN'), async (req, res, next) => {
  try {
    const user = req.user;
    const urls = await urlMappingService.getUrlsByUser(user);
    res.status(200).json(urls);
  } catch (error) {
    next(error);
  }
});

// Get URL analytics endpoint
router.get('/analytics/:shortUrl', authenticateToken, requireRole('ROLE_ADMIN'), async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set to end of day

    const clickEventDTOs = await urlMappingService.getClickEventsByDate(shortUrl, start, end);
    res.status(200).json(clickEventDTOs);
  } catch (error) {
    next(error);
  }
});

// Get total clicks by date endpoint
router.get('/totalClicks', authenticateToken, requireRole('ROLE_ADMIN'), async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const user = req.user;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalClicks = await urlMappingService.getTotalClicksByUserAndDate(user, start, end);
    res.status(200).json(totalClicks);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 