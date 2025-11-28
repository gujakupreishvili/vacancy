#  Job Application Platform

Simple job application platform with file upload functionality built with React, Express, and PostgreSQL.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed

## Installation & Setup

1. **Clone the repository:**
```bash
   git clone <your-repo-url>
   cd gstore
```

2. **Start the application:**
```bash
   docker-compose up --build
```

3. **Access the application:**
   
   Open your browser and go to: **http://localhost:5173**
   
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Database: localhost:5434

4. **Stop the application:**
```bash
   docker-compose down
```

## That's it! 

The application will automatically:
- Set up PostgreSQL database
- Create required tables (users)
- Start the backend server
- Start the frontend development server

## Features

- Job application form with CV upload
- File storage and management
- PostgreSQL database integration
- Docker containerization

## Troubleshooting

If something goes wrong, restart from scratch:
```bash
docker-compose down -v
docker-compose up --build
```

## Tech Stack

- React + Vite
- Express.js
- PostgreSQL 15
- Docker & Docker Compose