#!/bin/sh
set -e

echo "🔄 Waiting for database to be ready..."
sleep 5

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️  Seeding failed or no seed script found"

echo "🚀 Starting application..."
exec npm run start:prod