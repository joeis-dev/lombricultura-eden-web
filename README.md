# Lombricultura Eden Shop 

A fully functional, scalable, and multi-tenant e-commerce platform with guest checkout, user accounts, seller management, payment processing, and shipping integration.

## Features

- **Guest Checkout**: Purchase without registration using email/phone
- **User Accounts**: Registration with automatic order history linking
- **Seller Panel**: Product management, inventory, and analytics
- **Payment Processing**: Stripe integration
- **Shipping Integration**: Skydropx for logistics and tracking
- **Multi-tenant**: Easy rebranding and customization
- **Plugin System**: Extensible architecture for custom features

## Technology Stack

### Backend
- Java 21
- Spring Boot 3.4.1
- PostgreSQL 16
- Docker

### Frontend
- React 18
- TypeScript
- Vite
- pnpm
- Zustand (state management)

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Java 21 (for local development)
- Node.js 20+ (for local development)
- pnpm 9+

### Development Environment

```bash
# Clone the repository
git clone <repo-url>
cd claude

# Start all services with Docker
docker-compose up -d

# Access the applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Local Development (without Docker)

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

## Project Structure

```
.
├── backend/           # Spring Boot application
├── frontend/          # React application
├── docs/             # Documentation and wiki
├── .github/          # CI/CD workflows
└── docker-compose.yml
```

## Documentation

- [Architecture Overview](docs/wiki/architecture.md)
- [API Documentation](http://localhost:8080/swagger-ui.html)
- [Plugin Development Guide](docs/wiki/plugin-development.md)
- [Branding Customization](docs/wiki/branding-guide.md)
- [Deployment Guide](docs/wiki/deployment.md)

## Testing

### Backend
```bash
cd backend
./mvnw test                    # Unit tests
./mvnw verify                  # Integration tests
./mvnw jacoco:report          # Coverage report
```

### Frontend
```bash
cd frontend
pnpm test                      # Unit tests
pnpm test:e2e                 # E2E tests
pnpm test:coverage            # Coverage report
```

## Deployment

See [Deployment Guide](docs/wiki/deployment.md) for detailed instructions.

## License

GPL-3.0

