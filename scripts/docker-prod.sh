#!/bin/bash

echo "🚀 Starting production environment with Docker Compose..."

# Check if .env.docker exists
if [ ! -f .env.docker ]; then
    echo "❌ .env.docker file not found!"
    exit 1
fi

# Start production services with the environment file
docker compose --env-file .env.docker up --build -d

echo "✅ Production environment started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api"

# Show logs
docker compose --env-file .env.docker logs -f