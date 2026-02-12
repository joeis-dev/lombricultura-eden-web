# Deployment Guide

This guide covers deploying the e-commerce platform to production environments.

## Prerequisites

- Docker & Docker Compose
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)
- PostgreSQL database (managed or self-hosted)
- Stripe account with API keys
- Skydropx account with API keys
- Email service (SMTP)
- Server with minimum 2GB RAM, 2 CPU cores, 20GB storage

## Production Environment Setup

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /var/app/ecommerce
cd /var/app/ecommerce
```

### 2. Clone Repository

```bash
git clone <your-repo-url> .
```

### 3. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with production values
nano .env
```

**Production .env**:
```bash
# Environment
ENV=prod

# Database (use managed database in production)
DB_NAME=ecommerce_prod
DB_USER=ecommerce_prod_user
DB_PASSWORD=<strong-random-password>
DB_HOST=your-db-host.com
DB_PORT=5432

# JWT Secret (generate strong random key)
JWT_SECRET=<generate-with-openssl-rand-base64-32>

# Stripe (production keys)
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# Skydropx (production key)
SKYDROPX_API_KEY=<your-production-key>

# Email
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USERNAME=apikey
EMAIL_PASSWORD=<sendgrid-api-key>

# WhatsApp (optional)
WHATSAPP_API_KEY=<your-whatsapp-api-key>

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Frontend
VITE_API_URL=https://api.yourdomain.com
VITE_THEME_CONFIG=/branding/theme.json

# Domain
DOMAIN=yourdomain.com
```

### 4. SSL Certificate Setup

#### Option A: Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

#### Option B: Custom Certificate

Place your certificate files:
- `nginx/ssl/certificate.crt`
- `nginx/ssl/private.key`

### 5. Nginx Configuration

**File**: `nginx/nginx.conf`

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# Frontend
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6. Database Setup

#### Option A: Managed Database (Recommended)

Use a managed PostgreSQL service:
- AWS RDS
- Google Cloud SQL
- Azure Database for PostgreSQL
- DigitalOcean Managed Databases

#### Option B: Self-Hosted

```bash
# Create database
docker exec -it ecommerce-db psql -U postgres
CREATE DATABASE ecommerce_prod;
CREATE USER ecommerce_prod_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_prod TO ecommerce_prod_user;
\q
```

### 7. Build and Deploy

```bash
# Build images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 8. Database Migration

```bash
# Run migrations
docker exec -it ecommerce-backend ./mvnw flyway:migrate

# Or manually run init script
docker exec -it ecommerce-db psql -U ecommerce_prod_user -d ecommerce_prod -f /docker-entrypoint-initdb.d/init.sql
```

### 9. Health Checks

```bash
# Backend health
curl https://api.yourdomain.com/actuator/health

# Frontend health
curl https://yourdomain.com/health

# Database connection
docker exec -it ecommerce-db pg_isready
```

## Monitoring

### 1. Application Logs

```bash
# View all logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# Frontend logs only
docker-compose logs -f frontend

# Database logs
docker-compose logs -f postgres
```

### 2. Metrics

Access metrics at:
- Backend: https://api.yourdomain.com/actuator/metrics
- Database: Use pg_stat_statements

### 3. Alerts

Set up alerts for:
- High CPU/memory usage
- Database connection errors
- Payment failures
- Shipping API errors
- Low disk space

## Backup Strategy

### 1. Database Backups

```bash
# Create backup script
cat > /var/app/ecommerce/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/ecommerce"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Database backup
docker exec ecommerce-db pg_dump -U ecommerce_prod_user ecommerce_prod | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Uploads backup
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/app/uploads

# Keep only last 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /var/app/ecommerce/backup.sh

# Schedule daily backups
crontab -e
# Add: 0 2 * * * /var/app/ecommerce/backup.sh
```

### 2. Restore from Backup

```bash
# Restore database
gunzip < /var/backups/ecommerce/db_20240130_020000.sql.gz | docker exec -i ecommerce-db psql -U ecommerce_prod_user ecommerce_prod

# Restore uploads
tar -xzf /var/backups/ecommerce/uploads_20240130_020000.tar.gz -C /
```

## Scaling

### Horizontal Scaling

```bash
# Scale backend
docker-compose up -d --scale backend=3

# Use load balancer (nginx, HAProxy, or cloud load balancer)
```

### Vertical Scaling

Update docker-compose.prod.yml:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

## Performance Optimization

### 1. Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Analyze tables
ANALYZE products;
ANALYZE orders;
```

### 2. Caching

Add Redis for caching:

```yaml
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### 3. CDN

Use a CDN for static assets:
- Cloudflare
- AWS CloudFront
- Fastly

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Strong passwords and secrets
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] Database access restricted
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Regular backups
- [ ] Monitoring and alerts
- [ ] Security headers configured
- [ ] Dependencies updated

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs backend

# Check configuration
docker-compose config

# Restart service
docker-compose restart backend
```

### Database Connection Issues

```bash
# Check database is running
docker-compose ps postgres

# Test connection
docker exec -it ecommerce-db psql -U ecommerce_prod_user -d ecommerce_prod

# Check environment variables
docker-compose exec backend env | grep DB
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Restart services
docker-compose restart

# Increase memory limits in docker-compose.prod.yml
```

## Rollback Procedure

```bash
# Stop current version
docker-compose down

# Restore previous version
git checkout <previous-tag>

# Restore database backup
gunzip < backup.sql.gz | docker exec -i ecommerce-db psql -U ecommerce_prod_user ecommerce_prod

# Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Maintenance

### Regular Tasks

**Daily**:
- Check logs for errors
- Monitor resource usage
- Verify backups completed

**Weekly**:
- Review security alerts
- Check disk space
- Update dependencies

**Monthly**:
- Review performance metrics
- Test backup restoration
- Security audit
- Update documentation

## Support

For deployment support:
1. Check logs: `docker-compose logs`
2. Review this guide
3. Check GitHub issues
4. Contact DevOps team
