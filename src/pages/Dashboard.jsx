/*
 * Dashboard.jsx  –  src/pages/Dashboard.jsx
 *
 * The HOME page of the app.
 *
 * What it does:
 *  1. On first render, it calls the JSONPlaceholder API to fetch 10 users.
 *  2. While waiting for the response it shows a loading spinner.
 *  3. If something goes wrong (no internet, API down) it shows an error message.
 *  4. On success it displays the users in a Bootstrap table (id, name, email).
 *
 * React hooks used:
 *  - useState  : stores the list of users, the loading flag, and any error.
 *  - useEffect : runs the fetch call ONCE after the component mounts.
 *                The empty dependency array [] means "run only once".
 */

import React, { useState, useEffect } from 'react'

// The public API endpoint we fetch from
const API_URL = 'https://jsonplaceholder.typicode.com/users'

function Dashboard() {
  // ── State declarations ──────────────────────────────────────────────────
  // users    : array that will hold the fetched user objects
  // loading  : true while the fetch is in progress
  // error    : null if everything is fine, or a string message on failure
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── Side-effect: fetch data when component first renders ────────────────
  useEffect(() => {
    // We define an async function inside useEffect because
    // useEffect's callback itself cannot be async.
    async function fetchUsers() {
      try {
        setLoading(true)   // Start spinner
        setError(null)     // Clear any previous error

        const response = await fetch(API_URL)

        // fetch() does NOT throw for 4xx/5xx – we must check manually
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()   // Parse JSON body
        setUsers(data)                        // Store result in state
      } catch (err) {
        // Network failure, CORS error, JSON parse error, etc.
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        setLoading(false)  // Stop spinner regardless of success or failure
      }
    }

    fetchUsers()
  }, []) // [] = run only once (when the component mounts)

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <h1>🏠 Dashboard</h1>
        <p>Fetched users from the JSONPlaceholder public API</p>
      </div>

      {/* ── Loading Spinner ──────────────────────────────────────────── */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center py-5">
          {/* Bootstrap spinner component */}
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="fs-5 text-muted">Fetching users, please wait…</span>
        </div>
      )}

      {/* ── Error Message ────────────────────────────────────────────── */}
      {error && !loading && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2 fs-4">⚠️</span>
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* ── Users Table ──────────────────────────────────────────────── */}
      {/* Only render the table when we have data and no error */}
      {!loading && !error && users.length > 0 && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            👥 User List — {users.length} users loaded
          </div>
          <div className="card-body p-0">
            {/*
              table-responsive wraps the table in a div that adds
              horizontal scrolling on small screens instead of breaking layout.
            */}
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" id="users-table">
                <thead>
                  <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {/*
                    .map() loops over each user and returns a <tr> for it.
                    The key prop helps React efficiently update only changed rows.
                  */}
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge-id">{user.id}</span>
                      </td>
                      <td className="fw-semibold">{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none text-primary">
                          {user.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Data source: <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noreferrer">jsonplaceholder.typicode.com</a>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
