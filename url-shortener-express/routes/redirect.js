const express = require('express');
const urlMappingService = require('../services/urlMappingService');

const router = express.Router();

// Redirect endpoint
router.get('/:shortUrl', async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    
    // Validate shortUrl parameter
    if (!shortUrl || shortUrl.trim() === '') {
      return res.status(400).json({ error: 'Invalid short URL' });
    }
    
    console.log(`🔗 Redirect request for shortUrl: ${shortUrl}`);
    
    const urlMapping = await urlMappingService.getOriginalUrl(shortUrl);
    
    if (urlMapping && urlMapping.originalUrl) {
      console.log(`✅ Redirecting to: ${urlMapping.originalUrl}`);
      res.redirect(302, urlMapping.originalUrl);
    } else {
      console.log(`❌ URL not found for shortUrl: ${shortUrl}`);
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('❌ Redirect error:', error);
    next(error);
  }
});

module.exports = router; 