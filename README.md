# Go Users API & React Frontend

A full-stack application for managing users / calculating age, featuring a high-performance Go backend and a modern React + TypeScript frontend.

![Dashboard](image.png)
![Users List](image-1.png)

---

## 🚀 Tech Stack

### Backend
- **Language**: Go (Golang)
- **Framework**: GoFiber (v2)
- **Database**: PostgreSQL
- **ORM/Query Builder**: SQLC (Type-safe SQL)
- **Documentation**: Swagger via `swaggo`

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS v3 (Clean, responsive UI)
- **Icons**: Lucide React
- **HTTP Client**: Axios

---

## ✨ Features

- **Full CRUD**: Create, Read, Update, Delete users.
- **Dynamic Calculation**: Age is calculated on-the-fly based on Date of Birth.
- **Clean Architecture**: Backend organized into Handler, Service, and Repository layers.
- **Modern UI**:
    - Dark Mode toggle 🌙
    - Glassmorphism effects
    - Smooth animations and transitions
    - Mobile-responsive design
    - Interactive toast notifications

---

## 🛠️ Project Structure

```
go-users-api/
├── cmd/server/         # Backend entry point
├── config/             # Database configuration
├── db/                 # SQLC queries and migrations
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages
│   │   ├── services/   # API integration
│   │   └── types/      # TypeScript definitions
├── internal/           # Core backend logic (Handlers, Services, Repos)
└── README.md           # Project documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Go 1.20+
- Node.js 18+
- PostgreSQL

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd go-users-api
    ```

2.  **Database Configuration:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL=postgres://postgres:password@localhost:5432/users_db?sslmode=disable
    ```

3.  **Run Migrations:**
    Execute the SQL in `db/migrations/` to create the table.

4.  **Start the Server:**
    ```bash
    go mod tidy
    go run cmd/server/main.go
    ```
    Server runs at `http://localhost:8080`

### 2. Frontend Setup

1.  **Navigate to frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    Frontend runs at `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | List all users |
| `GET` | `/users/:id` | Get user by ID |
| `POST` | `/users` | Create new user |
| `PUT` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Delete user |

---

## 📝 Usage

1.  Open the frontend at `http://localhost:5173`.
2.  Use the **Dashboard** to view quick stats.
3.  Go to the **Users** page to add, edit, or remove users.
4.  Toggle **Dark Mode** in the header to suit your preference.

---