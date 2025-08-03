# SnapUrl - URL Shortener

A modern, full-stack URL shortener application built with React, Express.js, and PostgreSQL.

## Features
- URL shortening with click analytics
- User authentication and dashboard
- Real-time analytics with visual charts
- Responsive design

## Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS, React Query
- **Backend**: Express.js, Prisma, PostgreSQL, JWT
- **Security**: Helmet.js, CORS, bcryptjs, rate limiting

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Sudeep-Gupta04/SnapUrl.git
   cd SnapUrl
   ```

2. Setup Backend
   ```bash
   cd server
   npm install
   ```

3. Setup Frontend
   ```bash
   cd ../client
   npm install
   ```

4. Environment Configuration - Create `.env` in server directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/snapurl"
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRATION=172800000
   PORT=3000
   ```

5. Database Setup
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. Start the Application
   ```bash
   # Backend
   cd server && npm start
   
   # Frontend (new terminal)
   cd client && npm run dev
   ```

## API Endpoints

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/public/register` | Register user |
| POST | `/api/auth/public/login` | Login user |
| GET | `/api/urls/myurls` | Get user's URLs |
| POST | `/api/urls/shorten` | Create shortened URL |
| GET | `/api/urls/totalClicks` | Get analytics |
| GET | `/:shortUrl` | Redirect to original URL |

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## Author
**Sudeep Gupta** - [@Sudeep-Gupta04](https://github.com/Sudeep-Gupta04)
