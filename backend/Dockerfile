# Multi-stage build for Spring Boot application
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Create non-root user and uploads directory
RUN addgroup -S spring && adduser -S spring -G spring && \
    mkdir -p /app/uploads && \
    chown -R spring:spring /app

USER spring:spring

# Copy the built artifact from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
