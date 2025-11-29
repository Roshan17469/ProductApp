# Quick Start Guide

## 🚀 Fastest Way to Run (Docker Compose)

### 1. Prerequisites
- Docker Desktop installed and running
- Ports 3000, 8080, 3306 available

### 2. Start Everything
```bash
docker-compose up --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/users
- **Health Check**: http://localhost:8080/actuator/health

### 4. Stop Everything
```bash
docker-compose down
```

## 📋 Step-by-Step Commands

### Build Commands

```bash
# Build all containers
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Commands

```bash
# Start all services (foreground)
docker-compose up

# Start all services (background)
docker-compose up -d

# Start specific service
docker-compose up backend
```

### Stop Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Testing

```bash
# Run backend smoke tests
docker-compose exec backend mvn test

# Test API endpoint
curl http://localhost:8080/api/users

# Test health endpoint
curl http://localhost:8080/actuator/health
```

## 🔧 Local Development (Without Docker)

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Common Tasks

### Create a User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","status":"Active"}'
```

### View All Users
```bash
curl http://localhost:8080/api/users
```

### Update a User
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","status":"Active"}'
```

### Delete a User
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml or .env file
BACKEND_PORT=8081
FRONTEND_PORT=3001
```

### Container Won't Start
```bash
# Check logs
docker-compose logs [service-name]

# Restart service
docker-compose restart [service-name]

# Rebuild and restart
docker-compose up --build [service-name]
```

### Database Connection Issues
```bash
# Check MySQL is running
docker-compose ps mysql

# Connect to MySQL
docker-compose exec mysql mysql -u appuser -p productdb
```

## 📚 More Information

For detailed documentation, see [README.md](README.md)

