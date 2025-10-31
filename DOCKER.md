# Docker Setup Guide

This project includes comprehensive Docker configuration for both development and production environments.

## Prerequisites

- Docker Engine 20.0+
- Docker Compose 2.0+

## Quick Start

### Development Environment
```bash
# Start development environment with hot reload
./scripts/docker-dev.sh

# Or manually:
docker-compose -f docker-compose.dev.yml up --build
```

### Production Environment
```bash
# Start production environment
./scripts/docker-prod.sh

# Or manually:
docker-compose up --build -d
```

### Clean Up
```bash
# Clean up all Docker resources
./scripts/docker-clean.sh
```

## Services

### Development Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js development server with hot reload |
| Backend | 3001 | NestJS development server with hot reload |
| Debug | 9229 | Node.js debug port |
| PostgreSQL | 5432 | Database server |
| Redis | 6379 | Cache server |

### Production Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js production server |
| Backend | 3001 | NestJS production server |
| PostgreSQL | 5432 | Database server |
| Redis | 6379 | Cache server |

## Environment Configuration

Copy and modify the environment file:
```bash
cp .env.docker.example .env.docker
```

### Environment Variables
```bash
# Database
POSTGRES_DB=orders_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# Application
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Database Setup

The database will be automatically set up when you start the services. To manually run migrations and seed data:
```bash
# Run migrations
docker-compose exec backend npm run db:migrate

# Seed database
docker-compose exec backend npm run db:seed
```

## Logs and Debugging

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Debug Backend

The development environment exposes the Node.js debug port on 9229. You can connect your IDE debugger to `localhost:9229`.

### Execute Commands
```bash
# Access backend container
docker-compose exec backend sh

# Access database
docker-compose exec postgres psql -U postgres -d orders_db

# Access Redis
docker-compose exec redis redis-cli
```

## Health Checks

All services include health checks:
```bash
# Check service health
docker-compose ps

# Manual health check
curl http://localhost:3001/orders
curl http://localhost:3000
```

## Volumes and Data Persistence

- **PostgreSQL**: Data persisted in `postgres_data` volume
- **Redis**: Data persisted in `redis_data` volume
- **Development**: Source code mounted for hot reload

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, 5432, 6379 are available
2. **Permission issues**: Run with `sudo` if needed
3. **Memory issues**: Increase Docker memory allocation

### Reset Database
```bash
# Stop services and remove volumes
docker-compose down -v

# Restart services (will recreate database)
docker-compose up --build
```

### Rebuild Images
```bash
# Rebuild all images
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache backend
```

## Production Deployment

For production deployment, use the production docker-compose file:
```bash
# Build and start production services
docker-compose up --build -d

# Monitor logs
docker-compose logs -f
```

## Development Workflow

1. **Start development environment**:
```bash
   ./scripts/docker-dev.sh
```

2. **Make changes**: Files are mounted, changes reflect immediately

3. **View logs**: Monitor service logs for debugging

4. **Test changes**: Access frontend at http://localhost:3000

5. **Clean up**: Use clean script when done

## Tips

- Use `docker-compose down` to stop services
- Use `docker-compose down -v` to stop and remove volumes
- Use `docker system prune` to clean up unused resources
- Monitor resource usage with `docker stats`