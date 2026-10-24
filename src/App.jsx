/*
 * App.jsx
 *
 * This is the ROOT COMPONENT of the app.
 *
 * Responsibilities:
 *  - Renders the <Navbar /> so it appears on every page.
 *  - Defines the application ROUTES using <Routes> and <Route>:
 *      /               → Dashboard page (shows fetched users)
 *      /employee-form  → EmployeeForm page (add & list employees)
 *      *               → 404 fallback for any unknown URL
 *
 * React Router v6 concepts used here:
 *  - <Routes>   : container that picks the best matching route
 *  - <Route>    : maps a URL path to a component
 *  - element={} : JSX element to render when the route matches
 */

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar      from './components/Navbar'
import Dashboard   from './pages/Dashboard'
import EmployeeForm from './pages/EmployeeForm'

function App() {
  return (
    <>
      {/* Navbar is outside <Routes> so it renders on every page */}
      <Navbar />

      {/* Main content area with Bootstrap container for padding */}
      <main className="container py-4">
        <Routes>
          {/* Route 1: Home / Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Route 2: Employee Form */}
          <Route path="/employee-form" element={<EmployeeForm />} />

          {/* Route 3: Catch-all – shown for any unknown URL */}
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2 className="text-danger">404 – Page Not Found</h2>
                <p className="text-muted">The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
