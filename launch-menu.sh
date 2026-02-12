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

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start all services (Docker)"
echo "2) Start backend only (local development)"
echo "3) Start frontend only (local development)"
echo "4) View logs"
echo "5) Stop all services"
echo "6) Rebuild the whole app (clean start)"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting all services with Docker..."
        docker-compose up -d
        echo ""
        echo "✅ Services started!"
        echo ""
        echo "Access points:"
        echo "  Frontend: http://localhost:3000"
        echo "  Backend:  http://localhost:8080"
        echo "  API Docs: http://localhost:8080/swagger-ui.html (when implemented)"
        echo "  Database: localhost:5432"
        echo ""
        echo "View logs with: docker-compose logs -f"
        ;;
    2)
        echo ""
        echo "☕ Starting backend (local development)..."
        cd backend
        if [ ! -f mvnw ]; then
            echo "❌ Maven wrapper not found"
            exit 1
        fi
        ./mvnw spring-boot:run
        ;;
    3)
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
    4)
        echo ""
        echo "📋 Viewing logs..."
        docker-compose logs -f
        ;;
    5)
        echo ""
        echo "🛑 Stopping all services..."
        docker-compose down
        echo "✅ All services stopped"
        ;;
    6)
        echo ""
        echo "⚠️  This will rebuild the whole project!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "🧹 Cleaning up..."
            docker-compose down -v
            rm -rf backend/target
            rm -rf frontend/node_modules
            rm -rf frontend/dist
            echo "✅ Everything cleaned up"
            sleep 1
            echo "🐳 Starting all services with Docker..."
            docker-compose up --build -d
            echo ""
            echo "✅ Services were rebuild!"
            echo ""
            echo "Access points:"
            echo "  Frontend: http://localhost:3000"
            echo "  Backend:  http://localhost:8080"
            echo "  API Docs: http://localhost:8080/swagger-ui.html (when implemented)"
            echo "  Database: localhost:5432"
        else
            echo "Cancelled"
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
