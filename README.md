# Go Users API

A RESTful backend service built with Go to manage users and calculate their age dynamically based on their date of birth.

---

## 🚀 Tech Stack

- Go (Golang)
- GoFiber
- PostgreSQL
- SQLC
- go-playground/validator

---

## ✨ Features

- Create, update, and delete users
- Fetch user by ID with dynamically calculated age
- List all users
- Type-safe database access using SQLC
- Clean layered architecture (handler, service, repository)

---

## 📂 Project Structure

go-users-api/
├── cmd/
│ └── server/
│ └── main.go
│
├── config/
│ └── config.go
│
├── db/
│ ├── migrations/
│ │ └── 001_create_users.sql
│ │
│ └── sqlc/
│ ├── db.go
│ ├── models.go
│ └── queries.sql.go
│
├── internal/
│ ├── handler/
│ │ └── user_handler.go
│ │
│ ├── service/
│ │ └── user_service.go
│ │
│ ├── repository/
│ │ └── user_repository.go
│ │
│ ├── routes/
│ │ └── user_routes.go
│ │
│ ├── middleware/
│ │ ├── request_id.go
│ │ └── logger.go
│ │
│ ├── models/
│ │ └── user.go
│ │
│ └── logger/
│ └── zap.go
│
├── reasoning.md
├── README.md
├── go.mod
├── go.sum
└── sqlc.yaml

yaml
Copy code

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE NOT NULL
);
⚙️ Setup Instructions
1️⃣ Clone the repository
bash
Copy code
git clone <your-repo-url>
cd go-users-api
2️⃣ Create PostgreSQL database
sql
Copy code
CREATE DATABASE users_db;
3️⃣ Create .env file
Create a .env file in the project root:

env
Copy code
DATABASE_URL=postgres://postgres:password@localhost:5432/users_db?sslmode=disable
Update username, password, and database as per your setup.

4️⃣ Run database migration
Execute the migration SQL:

sql
Copy code
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE NOT NULL
);
(You can also use a migration tool if configured.)

5️⃣ Run the application
bash
Copy code
go mod tidy
go run ./cmd/server
🌐 Server
The server starts at:

arduino
Copy code
http://localhost:8080
🔗 API Endpoints
➕ Create User
POST /users

json
Copy code
{
  "name": "Alice",
  "dob": "1990-05-10"
}
🔍 Get User by ID
GET /users/{id}

📄 List Users
GET /users

✏️ Update User
PUT /users/{id}

json
Copy code
{
  "name": "Alice Updated",
  "dob": "1991-03-15"
}
❌ Delete User
DELETE /users/{id}

📝 Notes
Age is calculated dynamically and is not stored in the database

SQLC is used for type-safe query generation

Environment variables are used for configuration

Clean separation of concerns across layers

📌 Summary
This project demonstrates a production-style Go backend with:

Explicit dependency wiring

SQL-first database access using SQLC

Clean architecture principles

Real-world REST API patterns

markdown
Copy code

---

### ✅ Why this README is good
- Clean Markdown
- Professional structure
- Easy to read in VS Code
- GitHub-ready
- Interview/project-submission ready

If you want next:
- Add **API response examples**
- Add **curl commands**
- Add **Docker setup**
- Polish this for **portfolio / GitHub**

Just say the word 🚀
