# URL Shortener Express.js Backend

This is a complete Express.js backend for a URL shortener application, converted from a Spring Boot application. It uses PostgreSQL with Prisma ORM and JWT authentication.

## Features

- **URL Shortening**: Create short URLs from long URLs
- **User Authentication**: JWT-based authentication with registration and login
- **Analytics**: Track click events and generate analytics
- **Role-based Access**: Admin role required for URL management
- **Click Tracking**: Automatic tracking of URL clicks with timestamps
- **Database**: PostgreSQL with Prisma ORM

## API Endpoints

### Authentication
- `POST /api/auth/public/register` - Register a new user
- `POST /api/auth/public/login` - Login user

### URL Management (Requires Admin Role)
- `POST /api/urls/shorten` - Create a short URL
- `GET /api/urls/myurls` - Get user's URLs
- `GET /api/urls/analytics/:shortUrl` - Get URL analytics
- `GET /api/urls/totalClicks` - Get total clicks by date

### Redirect
- `GET /:shortUrl` - Redirect to original URL

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd url-shortener-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your database credentials and JWT secret.

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Push schema to database
   npm run prisma:db:push
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/url_shortener"
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_DIALECT=postgresql

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
JWT_EXPIRATION=172800000

# Application Configuration
PORT=3000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3001
```

## Database Schema

The application uses three main tables:

1. **users** - User accounts with authentication
2. **url_mappings** - URL shortening mappings
3. **click_events** - Click tracking events

## API Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/public/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/public/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

### Create Short URL
```bash
curl -X POST http://localhost:3000/api/urls/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "originalUrl": "https://example.com/very-long-url"
  }'
```

### Get User's URLs
```bash
curl -X GET http://localhost:3000/api/urls/myurls \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Analytics
```bash
curl -X GET "http://localhost:3000/api/urls/analytics/ABC12345?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
url-shortener-express/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── prisma/
│   └── schema.prisma     # Database schema
├── routes/               # Route handlers (controllers)
│   ├── auth.js          # Authentication routes
│   ├── urls.js          # URL management routes
│   └── redirect.js      # Redirect routes
├── services/            # Business logic (services)
│   ├── userService.js   # User management
│   └── urlMappingService.js # URL shortening logic
├── middleware/          # Middleware functions
│   ├── auth.js         # JWT authentication
│   └── errorHandler.js # Global error handling
└── dtos/               # Data Transfer Objects
    ├── authDTO.js      # Authentication DTOs
    ├── urlMappingDTO.js # URL mapping DTOs
    └── clickEventDTO.js # Click event DTOs
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## Error Handling

The application includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Custom business logic errors

All errors are properly formatted and returned to the client with appropriate HTTP status codes.

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:db:push` - Push schema to database

### Database Management
```bash
# View database in Prisma Studio
npm run prisma:studio

# Reset database
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name migration_name
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a production PostgreSQL database
3. Set a strong JWT secret
4. Configure proper CORS origins
5. Use a process manager like PM2
6. Set up proper logging

## License

MIT License 