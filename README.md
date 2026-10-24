# 🏢 Employee Dashboard — Full Stack App

A full-stack Employee Management application built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB Atlas** on the backend.

---

## 📁 Project Structure

```
employee-dashboard/
├── dist/              ← Compiled React frontend (served by Express)
├── src/               ← React source files (do not modify)
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── EmployeeForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── app.js             ← ✅ Express backend (CRUD API + MongoDB)
├── vite.config.js     ← Vite config with API proxy
├── package.json
├── .env.example       ← Template for environment variables
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anlinjaison/employee__dashboard.git
cd employee__dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and fill in your **MongoDB Atlas** connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/employeeDB?retryWrites=true&w=majority
PORT=5000
```

> 💡 **Get your URI from**: MongoDB Atlas → Your Cluster → Connect → Drivers → Node.js

### 4. Run the backend server

```bash
node app.js
```

The server starts at **http://localhost:5000**

---

## 🌐 API Endpoints

All endpoints are prefixed with `/api/employees`.

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/employees`      | Retrieve **all** employees   |
| GET    | `/api/employees/:id`  | Retrieve **one** employee    |
| POST   | `/api/employees`      | **Add** a new employee       |
| PUT    | `/api/employees/:id`  | **Update** an employee       |
| DELETE | `/api/employees/:id`  | **Delete** an employee       |

### Request Body (POST / PUT)

```json
{
  "name": "Priya Sharma",
  "designation": "Software Engineer",
  "location": "Mumbai",
  "salary": 75000
}
```

### Sample Response (GET all)

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Priya Sharma",
      "designation": "Software Engineer",
      "location": "Mumbai",
      "salary": 75000,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, React Router v6, Vite 5 |
| Styling   | Bootstrap 5                       |
| Backend   | Node.js, Express 5                |
| Database  | MongoDB Atlas (via Mongoose)      |
| Config    | dotenv                            |

---

## 📝 Employee Schema

| Field         | Type   | Required | Constraints              |
|---------------|--------|----------|--------------------------|
| `name`        | String | ✅ Yes   | Min 2 characters         |
| `designation` | String | ✅ Yes   | —                        |
| `location`    | String | ✅ Yes   | —                        |
| `salary`      | Number | ✅ Yes   | Must be > 0              |
| `createdAt`   | Date   | Auto     | Auto-managed by Mongoose |
| `updatedAt`   | Date   | Auto     | Auto-managed by Mongoose |

---

## 📦 Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `node app.js`   | Start the Express backend server         |
| `npm run dev`   | Start Vite dev server (frontend only)    |
| `npm run build` | Build React frontend to `dist/`          |

---

## ⚙️ How it Works

1. **Production**: `node app.js` starts Express which serves the compiled `dist/` folder and handles all `/api/*` requests.
2. **Development**: Run `node app.js` (backend on port 5000) and `npm run dev` (frontend on port 5173) simultaneously. Vite proxies `/api` calls to Express.
