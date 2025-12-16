# Go Users API

A RESTful backend service built with Go to manage users and calculate their age dynamically based on date of birth.

---

## Tech Stack

- Go (Golang)
- GoFiber
- PostgreSQL
- SQLC
- go-playground/validator

---

## Features

- Create, update, delete users
- Fetch user by ID with dynamically calculated age
- List all users
- Type-safe database access using SQLC
- Clean layered architecture (handler, service, repository)

---

## Project Structure

go-user-api/
├── cmd/
│   └── server/
│       └── main.go
│
├── config/
│   └── config.go
│
├── db/
│   ├── migrations/
│   │   └── 001_create_users.sql
│   │
│   └── sqlc/
│       ├── users.sql
│       ├── db.go
│       ├── models.go
│       └── queries.sql.go
│
├── internal/
│   ├── handler/
│   │   └── user_handler.go
│   │
│   ├── service/
│   │   └── user_service.go
│   │
│   ├── repository/
│   │   └── user_repository.go
│   │
│   ├── routes/
│   │   └── user_routes.go
│   │
│   ├── middleware/
│   │   ├── request_id.go
│   │   └── logger.go
│   │
│   ├── models/
│   │   └── user.go
│   │
│   └── logger/
│       └── zap.go
│
├── reasoning.md
├── README.md
├── go.mod
├── go.sum
└── sqlc.yaml


## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE NOT NULL
);

Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd go-users-api

2. Create PostgreSQL database
CREATE DATABASE users_db;

3. Create .env file
DATABASE_URL=postgres://postgres:password@localhost:5432/users_db?sslmode=disable

4. Run database migration
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE NOT NULL
);

5. Run the application
go mod tidy
go run cmd/server/main.go


Server will start on:

http://localhost:8080

API Endpoints
Create User
POST /users

{
  "name": "Alice",
  "dob": "1990-05-10"
}

Get User by ID
GET /users/{id}

List Users
GET /users

Update User
PUT /users/{id}

{
  "name": "Alice Updated",
  "dob": "1991-03-15"
}

Delete User
DELETE /users/{id}

Notes:

Age is calculated dynamically and is not stored in the database.

SQLC is used to generate type-safe database queries.

Environment variables are used for configuration.
![alt text](image-1.png)
![alt text](image.png)