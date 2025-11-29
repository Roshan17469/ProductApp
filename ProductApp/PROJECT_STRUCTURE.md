# Project Structure

## Complete Folder Structure

```
ProductApp/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── productapp/
│   │   │   │           ├── ProductAppApplication.java
│   │   │   │           ├── config/           # Configuration classes
│   │   │   │           │   └── CorsConfig.java
│   │   │   │           ├── controller/       # REST Controllers
│   │   │   │           │   └── UserController.java
│   │   │   │           ├── dto/              # Data Transfer Objects
│   │   │   │           │   └── UserDto.java
│   │   │   │           ├── exception/        # Exception handling
│   │   │   │           │   ├── DuplicateEmailException.java
│   │   │   │           │   ├── GlobalExceptionHandler.java
│   │   │   │           │   └── ResourceNotFoundException.java
│   │   │   │           ├── model/            # Entity Models (JPA)
│   │   │   │           │   └── User.java
│   │   │   │           ├── repository/       # JPA Repositories
│   │   │   │           │   └── UserRepository.java
│   │   │   │           └── service/          # Business Logic Layer
│   │   │   │               └── UserService.java
│   │   │   └── resources/
│   │   │       └── application.yml          # Application configuration
│   │   └── test/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── productapp/
│   │       │           ├── ProductAppApplicationTests.java
│   │       │           └── smoketest/
│   │       │               └── SmokeTest.java
│   │       └── resources/
│   │           └── application-test.yml
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile                       # Multi-stage Docker build
│   ├── mvnw                            # Maven wrapper (Unix)
│   └── pom.xml                         # Maven dependencies
│
├── frontend/                           # React Frontend
│   ├── src/
│   │   ├── api/                        # API service layer
│   │   │   ├── axios.js                # Axios configuration
│   │   │   └── userService.js          # User API calls
│   │   ├── components/                 # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Input.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Modal.css
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── Pagination.css
│   │   │   └── Table/
│   │   │       ├── Table.jsx
│   │   │       └── Table.css
│   │   ├── pages/                      # Page components
│   │   │   ├── UserList.jsx
│   │   │   └── UserList.css
│   │   ├── App.jsx                     # Main App component
│   │   ├── App.css
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── public/                         # Static assets (if any)
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile                      # Multi-stage Docker build
│   ├── index.html                      # HTML template
│   ├── nginx.conf                      # Nginx configuration
│   ├── package.json                    # NPM dependencies
│   └── vite.config.js                  # Vite configuration
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml                  # Docker Compose configuration
├── PROJECT_STRUCTURE.md                # This file
└── README.md                           # Main documentation
```

## Package Structure Details

### Backend Packages

- **`com.productapp`** - Root package
  - **`config`** - Spring configuration classes (CORS, etc.)
  - **`controller`** - REST API endpoints
  - **`dto`** - Data Transfer Objects for API requests/responses
  - **`exception`** - Custom exceptions and global exception handler
  - **`model`** - JPA entity models
  - **`repository`** - Spring Data JPA repositories
  - **`service`** - Business logic layer

### Frontend Structure

- **`api/`** - API communication layer
- **`components/`** - Reusable UI components
- **`pages/`** - Page-level components
- **Root files** - App configuration and entry points

## Key Files

### Backend
- `pom.xml` - Maven dependencies and build configuration
- `application.yml` - Spring Boot configuration
- `Dockerfile` - Container image definition

### Frontend
- `package.json` - NPM dependencies
- `vite.config.js` - Vite build tool configuration
- `Dockerfile` - Container image definition
- `nginx.conf` - Nginx web server configuration

### Root
- `docker-compose.yml` - Orchestrates all containers
- `README.md` - Complete project documentation

