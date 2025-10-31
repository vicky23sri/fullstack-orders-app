#!/bin/bash

echo "🧹 Cleaning up Docker environment..."

# Stop and remove containers
docker compose -f docker compose.yml down -v
docker compose -f docker compose.dev.yml down -v

# Remove images
docker compose -f docker compose.yml down --rmi all
docker compose -f docker compose.dev.yml down --rmi all

# Remove volumes
docker volume prune -f

# Remove unused images and containers
docker system prune -f

echo "✅ Docker environment cleaned!"