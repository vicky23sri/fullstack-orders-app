#!/bin/bash

echo "🚀 Starting development environment with Docker Compose..."

# Load environment variables
if [ -f .env.docker ]; then
    export $(cat .env.docker | xargs)
fi

# Start development services
docker-compose -f docker-compose.dev.yml up --build

echo "✅ Development environment started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api"