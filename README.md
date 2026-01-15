# User Management System

A full-stack web application for managing user accounts with authentication, CRUD operations, and role-based access control. Built with React + Vite for the frontend and Express + MongoDB for the backend.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **CRUD Operations**: Create, read, update, and delete user accounts
- **Protected Routes**: Role-based access control for authenticated users
- **Password Encryption**: Bcrypt for secure password hashing
- **Cookie-based Sessions**: Automatic session management with JWT cookies
- **Responsive UI**: Modern React interface with routing
- **CORS Support**: Configured for seamless frontend-backend communication

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **ESLint** - Code quality tool

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling
- **dotenv** - Environment variables

## Project Structure

user-management-system/
├── backend/ # Express server
│ ├── index.js # Server entry point
│ ├── package.json
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ └── users.js # User business logic
│ ├── middlewares/
│ │ └── auth.js # JWT authentication middleware
│ ├── models/
│ │ └── users.js # User schema and model
│ └── routes/
│ └── userRouter.js # API routes
│
└── frontend/ # React + Vite app
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── axiosConfig.js # Axios configuration
├── src/
│ ├── App.jsx # Main app component
│ ├── main.jsx # Entry point
│ ├── App.css
│ ├── index.css
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ └── ProtectedRoute.jsx # Auth guard
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── EditUser.jsx
│ │ ├── About.jsx
│ │ └── OutletComponent.jsx
│ └── assets/
└── public/


## API Endpoints

### Public Routes
- `GET /users` - Get all users
- `GET /users/check` - Check user authentication status
- `POST /users/add` - Register a new user
- `POST /users/login` - Login user

### Protected Routes (Requires Authentication)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

2.Install dependencies:
npm install

3.Create a .env file in the backend directory with the following variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000

4.Start the server:
# Development (with hot reload)
npm run dev

# Production
npm start

The backend will run on http://localhost:3000

Frontend Setup
1.Navigate to the frontend directory:
cd frontend

2.Install dependencies:
npm install

3.Start the development server:
npm run dev

The frontend will run on http://localhost:5173

# What This Project Demonstrates

Full-stack authentication flow

Secure user management

Protected routing architecture

Clean separation of concerns

Real-world validation practices

Dark/Light theme implementation
