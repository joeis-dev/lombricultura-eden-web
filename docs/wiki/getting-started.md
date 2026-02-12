# E-commerce Platform - Getting Started

Welcome to the E-commerce Platform! This guide will help you get started with development.

## Prerequisites

- **Docker & Docker Compose** - For containerized development
- **Java 21** - For backend development (optional if using Docker)
- **Node.js 20+** - For frontend development (optional if using Docker)
- **pnpm 10+** - Package manager for frontend
- **PostgreSQL 16** - Database (optional if using Docker)

## Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <your-repo-url>
cd claude

# Copy environment variables
cp .env.example .env

# Edit .env and add your API keys:
# - STRIPE_API_KEY
# - SKYDROPX_API_KEY
# - EMAIL credentials
# - etc.

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Database**: localhost:5432

## Local Development (without Docker)

### Backend

```bash
cd backend

# Run the application
./mvnw spring-boot:run

# Run tests
./mvnw test

# Generate coverage report
./mvnw jacoco:report

# Build JAR
./mvnw clean package
```

### Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
claude/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/shop/ecommerce/
│   │   │   │   ├── domain/           # Domain entities and repositories
│   │   │   │   ├── application/      # Business logic and services
│   │   │   │   ├── infrastructure/   # External integrations
│   │   │   │   └── presentation/     # REST controllers
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── db/init.sql
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── features/        # Feature modules
│   │   ├── services/        # API clients
│   │   ├── store/           # State management
│   │   └── types/           # TypeScript types
│   ├── public/
│   │   └── branding/        # Multi-tenant assets
│   ├── Dockerfile
│   └── package.json
├── docs/                    # Documentation
│   └── wiki/
├── .github/
│   └── workflows/           # CI/CD pipelines
├── docker-compose.yml
└── README.md
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Follow the clean code principles:
- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused
- Write tests for new features

### 3. Run Tests

```bash
# Backend
cd backend && ./mvnw test

# Frontend
cd frontend && pnpm test
```

### 4. Commit and Push

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

The CI/CD pipeline will automatically:
- Run tests
- Check code coverage
- Build Docker images
- Deploy to staging (for develop branch)

## Environment Variables

### Backend (.env)

```bash
# Database
DB_NAME=ecommerce
DB_USER=ecommerce_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_jwt_secret_minimum_32_characters

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Skydropx
SKYDROPX_API_KEY=your_skydropx_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# WhatsApp (optional)
WHATSAPP_API_KEY=your_whatsapp_key
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_THEME_CONFIG=/branding/theme.json
```

## Next Steps

1. **Complete Backend Implementation**
   - Implement remaining services (see `docs/wiki/backend-implementation.md`)
   - Add JWT authentication
   - Integrate Stripe payment
   - Integrate Skydropx shipping

2. **Complete Frontend Implementation**
   - Build all pages (see `docs/wiki/frontend-implementation.md`)
   - Implement routing
   - Add Stripe checkout
   - Create seller panel

3. **Testing**
   - Write unit tests
   - Add integration tests
   - Implement E2E tests

4. **Documentation**
   - Complete API documentation
   - Write user guides
   - Document plugin system

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

### Port Conflicts

If ports 3000, 5432, or 8080 are already in use:

```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>

# Or change ports in docker-compose.yml
```

### Maven Build Issues

```bash
# Clean and rebuild
./mvnw clean install -U

# Skip tests
./mvnw clean install -DskipTests
```

### pnpm Issues

```bash
# Clear cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Support

For questions or issues:
1. Check the [Wiki](docs/wiki/)
2. Review [API Documentation](http://localhost:8080/swagger-ui.html)
3. Create an issue in the repository

## License

Proprietary - All rights reserved
