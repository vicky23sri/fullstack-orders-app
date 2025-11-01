# Full-Stack Orders Management Application

A modern full-stack application for managing orders with real-time updates, caching, and responsive design.

## Live Demo

- **Frontend**: [Deployed on Vercel](https://fullstack-orders-app-hrev.vercel.app/)
- **Backend**: [Deployed on Railway](https://fullstack-orders-app-9ry9.onrender.com)
- **API Documentation**: [Swagger UI](https://your-backend.railway.app/api)

## Architecture Overview
```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│                 │ ──────────────> │                 │
│   Next.js       │                 │   NestJS API    │
│   Frontend      │ <────────────── │   Backend       │
│                 │                 │                 │
└─────────────────┘                 └─────────────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │   PostgreSQL    │
                                    │   Database      │
                                    └─────────────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │     Redis       │
                                    │     Cache       │
                                    └─────────────────┘
```

## Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis with 30-second TTL
- **Queue**: Mock queue for async processing
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Components**: ShadcnUI
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios

## Features

### Backend Features
- ✅ RESTful API with proper HTTP methods
- ✅ PostgreSQL database with relational schema
- ✅ Redis caching with automatic invalidation
- ✅ Pagination and search functionality
- ✅ Transactional order creation
- ✅ Mock queue for async order processing
- ✅ Input validation and error handling
- ✅ API documentation with Swagger

### Frontend Features
- ✅ Responsive dashboard with statistics
- ✅ Orders management with CRUD operations
- ✅ Real-time search and filtering
- ✅ Pagination for large datasets
- ✅ Form validation with user feedback
- ✅ Loading states and error handling
- ✅ Mobile-friendly design

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis

### Local Development

1. **Clone the repository:**
```bash
   git clone <your-repo-url>
   cd fullstack-orders-app
```

2. **Set up the backend:**
```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your database and Redis URLs
   createdb orders_db
   npx prisma migrate dev --name init
   npm run seed
   npm run start:dev
```

3. **Set up the frontend:**
```bash
   cd ../frontend
   npm install
   cp .env.local.example .env.local  # Configure API URL
   npm run dev
```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api

## Deployment

### Backend (Railway/Render/Fly.io)
1. Connect GitHub repository
2. Set environment variables:
   - `DATABASE_URL`
   - `REDIS_URL`
   - `PORT=3001`
3. Deploy using provided Dockerfile

### Frontend (Vercel)
1. Connect GitHub repository
2. Set environment variable:
   - `NEXT_PUBLIC_API_URL=your-backend-url`
3. Deploy automatically

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List orders with pagination and search |
| POST | `/orders` | Create a new order |
| GET | `/products` | List all products |
| GET | `/api` | Swagger documentation |

## Database Schema
```sql
Users (id, email, name, created_at, updated_at)
Products (id, name, description, price, stock, created_at, updated_at)
Orders (id, user_id, status, total, created_at, updated_at)
OrderItems (id, order_id, product_id, quantity, price)
```

## Performance Features

- **Redis Caching**: 30-second TTL for GET requests
- **Cache Invalidation**: Automatic cache clearing on new orders
- **Pagination**: Efficient data loading
- **Database Indexes**: Optimized query performance
- **Connection Pooling**: Efficient database connections

# fullstack-orders-app
