const { PrismaClient } = require('@prisma/client');
const UrlMappingDTO = require('../dtos/urlMappingDTO');
const ClickEventDTO = require('../dtos/clickEventDTO');

const prisma = new PrismaClient();

class UrlMappingService {
  generateShortUrl() {
    const characters = 'ABCDEFGHIjKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 8; i++) {
      shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortUrl;
  }

  async createShortUrl(originalUrl, user) {
    try {
      let shortUrl;
      let isUnique = false;

      // Generate unique short URL
      while (!isUnique) {
        shortUrl = this.generateShortUrl();
        const existing = await prisma.urlMapping.findUnique({
          where: { shortenUrl: shortUrl }
        });
        if (!existing) {
          isUnique = true;
        }
      }

      // Create URL mapping
      const urlMapping = await prisma.urlMapping.create({
        data: {
          originalUrl,
          shortenUrl: shortUrl,
          userId: user.id,
          createdDate: new Date()
        },
        include: {
          user: true
        }
      });

      return UrlMappingDTO.fromEntity(urlMapping);
    } catch (error) {
      throw error;
    }
  }

  async getUrlsByUser(user) {
    try {
      const urlMappings = await prisma.urlMapping.findMany({
        where: { userId: user.id },
        include: {
          user: true
        }
      });

      return UrlMappingDTO.fromEntities(urlMappings);
    } catch (error) {
      throw error;
    }
  }

  async getClickEventsByDate(shortUrl, startDate, endDate) {
    try {
      const urlMapping = await prisma.urlMapping.findUnique({
        where: { shortenUrl: shortUrl }
      });

      if (!urlMapping) {
        return [];
      }

      const clickEvents = await prisma.clickEvent.findMany({
        where: {
          urlMappingId: urlMapping.id,
          clickDate: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Group by date and count
      const groupedClicks = {};
      clickEvents.forEach(event => {
        const date = event.clickDate.toISOString().split('T')[0];
        groupedClicks[date] = (groupedClicks[date] || 0) + 1;
      });

      return ClickEventDTO.fromGroupedData(groupedClicks);
    } catch (error) {
      throw error;
    }
  }

  async getTotalClicksByUserAndDate(user, startDate, endDate) {
    try {
      const userUrls = await prisma.urlMapping.findMany({
        where: { userId: user.id }
      });

      if (userUrls.length === 0) {
        return {};
      }

      const urlMappingIds = userUrls.map(url => url.id);

      const clickEvents = await prisma.clickEvent.findMany({
        where: {
          urlMappingId: {
            in: urlMappingIds
          },
          clickDate: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      // Group by date and count
      const clickCountByDate = {};
      clickEvents.forEach(event => {
        const date = event.clickDate.toISOString().split('T')[0];
        clickCountByDate[date] = (clickCountByDate[date] || 0) + 1;
      });

      return clickCountByDate;
    } catch (error) {
      throw error;
    }
  }

  async getOriginalUrl(shortUrl) {
    try {
      console.log(`🔍 Looking for shortUrl: ${shortUrl}`);
      
      const urlMapping = await prisma.urlMapping.findUnique({
        where: { shortenUrl: shortUrl }
      });

      console.log(`🔍 Found urlMapping:`, urlMapping ? 'Yes' : 'No');

      if (urlMapping) {
        console.log(`📊 Original URL: ${urlMapping.originalUrl}`);
        
        // Update click count
        await prisma.urlMapping.update({
          where: { id: urlMapping.id },
          data: { clickCount: urlMapping.clickCount + 1 }
        });

        // Record click event
        await prisma.clickEvent.create({
          data: {
            urlMappingId: urlMapping.id,
            clickDate: new Date()
          }
        });
        
        console.log(`✅ Click count updated and event recorded`);
      } else {
        console.log(`❌ No URL mapping found for: ${shortUrl}`);
      }

      return urlMapping;
    } catch (error) {
      console.error('❌ Error in getOriginalUrl:', error);
      throw error;
    }
  }
}

module.exports = new UrlMappingService(); 