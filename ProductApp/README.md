# Full-Stack Spring Boot + React + MySQL Application

A production-ready full-stack application built with Spring Boot (backend), React (frontend), and MySQL (database), all containerized with Docker.

## 🏗️ Technology Stack

- **Backend:** Spring Boot 3.2.0, Java 17, JPA/Hibernate
- **Frontend:** React 18, Vite, React Router
- **Database:** MySQL 8.0
- **Containerization:** Docker & Docker Compose
- **Build Tools:** Maven (backend), Vite (frontend)

## 📁 Project Structure

```
ProductApp/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/productapp/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Exception handling
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   │       └── java/com/productapp/
│   │           └── smoketest/       # Smoke tests
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── api/                     # API service layer
│   │   ├── components/              # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Pagination/
│   │   │   └── Table/
│   │   ├── pages/                   # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop (or Docker + Docker Compose)
- Java 17+ (for local backend development)
- Node.js 18+ (for local frontend development)
- Maven 3.6+ (for local backend development)

### Running with Docker Compose (Recommended)

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Create environment file** (optional):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to customize:
   - `MYSQL_ROOT_PASSWORD`: MySQL root password
   - `MYSQL_DATABASE`: Database name
   - `MYSQL_USER`: Database user
   - `MYSQL_PASSWORD`: Database password
   - `BACKEND_PORT`: Backend port (default: 8080)
   - `FRONTEND_PORT`: Frontend port (default: 3000)

3. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/users
   - Health Check: http://localhost:8080/actuator/health

5. **Stop all services**:
   ```bash
   docker-compose down
   ```

### Running Locally (Without Docker)

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Set up MySQL database**:
   - Create database: `CREATE DATABASE productdb;`
   - Create user (optional): `CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'apppass';`
   - Grant privileges: `GRANT ALL PRIVILEGES ON productdb.* TO 'appuser'@'localhost';`

3. **Configure database connection** in `src/main/resources/application.yml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/productdb
       username: your_username
       password: your_password
   ```

4. **Build and run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**: http://localhost:5173

## 🧪 Testing

### Backend Smoke Tests

Run smoke tests to verify:
- Database connection
- API endpoint availability
- Health check endpoint

```bash
# With Docker
docker-compose exec backend mvn test

# Locally
cd backend
mvn test
```

### Manual API Testing

#### Get all users:
```bash
curl http://localhost:8080/api/users
```

#### Create a user:
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "status": "Active"
  }'
```

#### Get user by ID:
```bash
curl http://localhost:8080/api/users/1
```

#### Update user:
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john@example.com",
    "status": "Inactive"
  }'
```

#### Delete user:
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Request/Response Format

**Create/Update User:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "Active"
}
```

**User Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "status": "Active"
}
```

## 🛠️ Build Commands

### Backend

```bash
# Build JAR
mvn clean package

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Build Docker image
cd backend
docker build -t product-backend .
```

### Frontend

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Build Docker image
cd frontend
docker build -t product-frontend .
```

## 🐳 Docker Commands

```bash
# Build all images
docker-compose build

# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# Restart a specific service
docker-compose restart backend

# Execute command in container
docker-compose exec backend bash
docker-compose exec mysql mysql -u appuser -p productdb
```

## 🔧 Configuration

### Environment Variables

#### Backend (`application.yml` or environment variables):
- `DB_URL`: MySQL connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `SERVER_PORT`: Server port (default: 8080)
- `LOG_LEVEL`: Logging level (default: INFO)

#### Frontend (`.env`):
- `VITE_API_BASE_URL`: Backend API base URL

#### Docker Compose (`.env`):
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_DATABASE`: Database name
- `MYSQL_USER`: Database user
- `MYSQL_PASSWORD`: Database password
- `BACKEND_PORT`: Backend exposed port
- `FRONTEND_PORT`: Frontend exposed port

## 📦 Features

### Backend Features
- ✅ RESTful API with CRUD operations
- ✅ JPA/Hibernate for database operations
- ✅ Global exception handling
- ✅ Request validation
- ✅ Logging with SLF4J
- ✅ Health checks with Actuator
- ✅ CORS configuration
- ✅ MySQL integration
- ✅ Smoke tests

### Frontend Features
- ✅ Modern React with hooks
- ✅ Responsive UI design
- ✅ Reusable components (Button, Input, Table, Modal, Pagination)
- ✅ Toast notifications
- ✅ Form validation
- ✅ Client-side pagination
- ✅ Error handling
- ✅ Loading states

## 🔍 Troubleshooting

### Backend won't start
- Check MySQL is running and accessible
- Verify database credentials in `application.yml`
- Check port 8080 is not in use
- Review logs: `docker-compose logs backend`

### Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` in frontend `.env`
- Check backend is running and accessible
- Verify CORS configuration in backend
- In Docker: Use `http://backend:8080` instead of `http://localhost:8080`

### Database connection errors
- Ensure MySQL container is healthy: `docker-compose ps`
- Check MySQL logs: `docker-compose logs mysql`
- Verify database credentials
- Try restarting MySQL: `docker-compose restart mysql`

### Port conflicts
- Change ports in `docker-compose.yml` or `.env` file
- Check what's using the port: `netstat -ano | findstr :8080` (Windows) or `lsof -i :8080` (Mac/Linux)

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Docker Documentation](https://docs.docker.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📄 License

This project is for educational purposes.

## 👥 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Coding! 🚀**

