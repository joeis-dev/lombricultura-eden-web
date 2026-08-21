#!/bin/bash

# E-commerce Platform Quick Start Script
# This script helps you get started with the development environment

set -e

echo "🚀 E-commerce Platform - Quick Start"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your API keys before continuing"
    echo ""
    echo "Required API keys:"
    echo "  - STRIPE_API_KEY (get from https://stripe.com)"
    echo "  - SKYDROPX_API_KEY (get from https://skydropx.com)"
    echo "  - EMAIL credentials (SMTP)"
    echo ""
    read -p "Press Enter after you've configured .env..."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    echo "Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Read ports from config files instead of hardcoding them
FRONTEND_DEV_PORT=$(grep -m1 -oP '^\s*port:\s*\K[0-9]+' frontend/vite.config.ts)
FRONTEND_PROD_PORT=$(grep -m1 -oP '^EXPOSE\s+\K[0-9]+' frontend/Dockerfile)
BACKEND_PORT=$(awk '/^server:/{s=1;next} s&&/^  port:/{print $2;exit}' backend/src/main/resources/application.yml)
DB_PORT=$(grep -m1 -oP 'jdbc:postgresql://[^:/]+:\K[0-9]+' docker-compose.yml)

FRONTEND_DEV_PORT=${FRONTEND_DEV_PORT:-3000}
FRONTEND_PROD_PORT=${FRONTEND_PROD_PORT:-3000}
BACKEND_PORT=${BACKEND_PORT:-8080}
DB_PORT=${DB_PORT:-5432}

print_access_points() {
    local frontend_port=$1
    echo "Access points:"
    echo "  Frontend: http://localhost:${frontend_port}"
    echo "  Backend:  http://localhost:${BACKEND_PORT}"
    echo "  API Docs: http://localhost:${BACKEND_PORT}/swagger-ui.html (when implemented)"
    echo "  Database: localhost:${DB_PORT}"
}

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start all services - DEV mode (Docker + hot reload)"
echo "2) Start all services - PROD mode (Docker)"
echo "3) Start backend only (local development)"
echo "4) Start frontend only (local development)"
echo "5) View logs"
echo "6) Stop all services"
echo "7) Rebuild the whole app - DEV mode (clean start)"
echo "8) Rebuild the whole app - PROD mode (clean start)"
echo ""
read -p "Enter your choice (1-8): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting all services in DEV mode (hot reload enabled)..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
        echo ""
        echo "✅ Services started in DEV mode!"
        echo ""
        print_access_points "$FRONTEND_DEV_PORT"
        echo ""
        echo "📝 Hot reload is enabled for frontend!"
        echo "View logs with: docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f"
        ;;
    2)
        echo ""
        echo "🐳 Starting all services in PROD mode..."
        docker-compose up -d
        echo ""
        echo "✅ Services started in PROD mode!"
        echo ""
        print_access_points "$FRONTEND_PROD_PORT"
        echo ""
        echo "View logs with: docker-compose logs -f"
        ;;
    3)
        echo ""
        echo "☕ Starting backend (local development)..."
        cd backend
        if [ ! -f mvnw ]; then
            echo "❌ Maven wrapper not found"
            exit 1
        fi
        ./mvnw spring-boot:run
        ;;
    4)
        echo ""
        echo "⚛️  Starting frontend (local development)..."
        cd frontend
        if ! command -v pnpm &> /dev/null; then
            echo "❌ pnpm is not installed"
            echo "Install with: npm install -g pnpm"
            exit 1
        fi
        if [ ! -d node_modules ]; then
            echo "📦 Installing dependencies..."
            pnpm install
        fi
        pnpm dev
        ;;
    5)
        echo ""
        echo "📋 Viewing logs..."
        echo "Choose environment:"
        echo "1) DEV mode"
        echo "2) PROD mode"
        read -p "Enter your choice (1-2): " log_choice
        if [ "$log_choice" = "1" ]; then
            docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
        else
            docker-compose logs -f
        fi
        ;;
    6)
        echo ""
        echo "🛑 Stopping all services..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
        docker-compose down
        echo "✅ All services stopped"
        ;;
    7)
        echo ""
        echo "⚠️  This will rebuild the whole project in DEV mode!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "🧹 Cleaning up..."
            docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
            docker-compose down -v
            rm -rf backend/target
            rm -rf frontend/node_modules
            rm -rf frontend/dist
            echo "✅ Everything cleaned up"
            sleep 1
            echo "🐳 Starting all services in DEV mode..."
            docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
            echo ""
            echo "✅ Services were rebuilt in DEV mode!"
            echo ""
            print_access_points "$FRONTEND_DEV_PORT"
            echo ""
            echo "📝 Hot reload is enabled for frontend!"
        else
            echo "Cancelled"
        fi
        ;;
    8)
        echo ""
        echo "⚠️  This will rebuild the whole project in PROD mode!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "🧹 Cleaning up..."
            docker-compose down -v
            rm -rf backend/target
            rm -rf frontend/node_modules
            rm -rf frontend/dist
            echo "✅ Everything cleaned up"
            sleep 1
            echo "🐳 Starting all services in PROD mode..."
            docker-compose up --build -d
            echo ""
            echo "✅ Services were rebuilt in PROD mode!"
            echo ""
            print_access_points "$FRONTEND_PROD_PORT"
            echo ""
        else
            echo "Cancelled"
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
