# Orders Management Backend

A NestJS-based backend API for managing orders with Redis caching and PostgreSQL database.

## Features

- **Order Management**: Create and retrieve orders with pagination
- **Redis Caching**: 30-second TTL caching for GET requests
- **Search Functionality**: Search orders by customer name or email
- **Queue Processing**: Mock queue for asynchronous order confirmation
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: Swagger UI available

## Tech Stack

- NestJS (Node.js framework)
- PostgreSQL (Database)
- Prisma ORM (Database toolkit)
- Redis (Caching)
- TypeScript
- Class Validator (Input validation)

## Local Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis

### Installation

1. Clone the repository and navigate to backend:
```bash
   cd backend
   npm install
```

2. Set up environment variables:
```bash
   cp .env.example .env
```
   
   Update `.env` with your database and Redis credentials:
```
   DATABASE_URL="postgresql://username:password@localhost:5432/orders_db?schema=public"
   REDIS_URL="redis://localhost:6379"
   PORT=3001
   NODE_ENV=development
```

3. Set up the database:
```bash
   createdb orders_db
   npx prisma migrate dev --name init
   npx prisma generate
```

4. Seed the database with sample data:
```bash
   npm run seed
```

5. Start the development server:
```bash
   npm run start:dev
```

The API will be available at `http://localhost:3001`

### API Documentation

Visit `http://localhost:3001/api` for Swagger documentation.

### Key Endpoints

- `GET /orders` - List orders with pagination and search
- `POST /orders` - Create a new order
- `GET /products` - List all products

### Database Schema

- **Users**: Customer information
- **Products**: Product catalog with stock management
- **Orders**: Order headers with status tracking
- **OrderItems**: Individual items within orders

## Deployment

### Environment Variables for Production
```
DATABASE_URL=your_production_database_url
REDIS_URL=your_production_redis_url
PORT=3001
NODE_ENV=production
```

### Docker Deployment
```bash
docker build -t orders-backend .
docker run -p 3001:3001 orders-backend
```

### Platform Deployment (Railway/Render/Fly.io)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy using the provided Dockerfile

## Trade-offs and Shortcuts

1. **Authentication**: No authentication implemented for demo purposes
2. **Error Handling**: Basic error handling, could be more comprehensive
3. **Validation**: Basic validation, could include more business rules
4. **Testing**: No tests implemented due to time constraints
5. **Queue**: Mock queue instead of real SQS implementation
6. **Monitoring**: No logging or monitoring setup