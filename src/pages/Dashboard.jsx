/*
 * Dashboard.jsx  –  src/pages/Dashboard.jsx
 *
 * The HOME page of the app.
 *
 * What it does:
 *  1. On first render, it calls our own Express backend to fetch all employees
 *     stored in MongoDB Atlas.
 *  2. While waiting for the response it shows a loading spinner.
 *  3. If something goes wrong it shows an error message with a retry button.
 *  4. On success it displays all employees in a Bootstrap table with
 *     Edit and Delete action buttons.
 *  5. Clicking Delete sends a DELETE request to the backend and refreshes.
 *  6. Clicking Edit navigates to /employee-form?edit=<id> to pre-fill the form.
 *
 * React hooks used:
 *  - useState  : stores employees, loading flag, error, and deleteMsg.
 *  - useEffect : runs the fetch call when the component mounts (and when
 *                refreshTrigger changes – used to reload after a delete).
 */

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// API base URL – in dev the Vite proxy forwards /api → http://localhost:5000
const API_BASE = '/api/employees'

function Dashboard() {
  // ── State declarations ──────────────────────────────────────────────────
  const [employees,   setEmployees]   = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [deleteMsg,   setDeleteMsg]   = useState('')        // success/error after delete
  const [deletingId,  setDeletingId]  = useState(null)     // which row is being deleted

  const navigate = useNavigate()

  // ── Fetch all employees from backend ────────────────────────────────────
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(API_BASE)

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      const json = await response.json()
      setEmployees(json.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load employees. Is the server running?')
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on mount
  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  // ── Delete handler ──────────────────────────────────────────────────────
  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return

    setDeletingId(id)
    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || 'Failed to delete employee')
      }

      setDeleteMsg(`✅ "${name}" deleted successfully.`)
      // Refresh the list
      await fetchEmployees()
    } catch (err) {
      setDeleteMsg(`❌ ${err.message}`)
    } finally {
      setDeletingId(null)
      // Auto-clear message after 4 s
      setTimeout(() => setDeleteMsg(''), 4000)
    }
  }

  // ── Navigate to form in edit mode ───────────────────────────────────────
  function handleEdit(id) {
    navigate(`/employee-form?edit=${id}`)
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <h1>🏠 Employee Dashboard</h1>
        <p>All employees stored in MongoDB Atlas — live data from the backend API</p>
      </div>

      {/* ── Delete feedback alert ─────────────────────────────────── */}
      {deleteMsg && (
        <div
          className={`alert ${deleteMsg.startsWith('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}
          role="alert"
        >
          {deleteMsg}
          <button type="button" className="btn-close" onClick={() => setDeleteMsg('')} aria-label="Close" />
        </div>
      )}

      {/* ── Loading Spinner ──────────────────────────────────────────── */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="fs-5 text-muted">Fetching employees from MongoDB…</span>
        </div>
      )}

      {/* ── Error Message ────────────────────────────────────────────── */}
      {error && !loading && (
        <div className="alert alert-danger d-flex align-items-start" role="alert">
          <span className="me-2 fs-4">⚠️</span>
          <div>
            <strong>Error:</strong> {error}
            <div className="mt-2">
              <button className="btn btn-sm btn-outline-danger" onClick={fetchEmployees}>
                🔄 Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Empty State ───────────────────────────────────────────────── */}
      {!loading && !error && employees.length === 0 && (
        <div className="card text-center py-5">
          <div className="card-body">
            <p className="fs-4 mb-2">📭 No employees found.</p>
            <p className="text-muted mb-3">Add your first employee using the form.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/employee-form')}
            >
              ➕ Add Employee
            </button>
          </div>
        </div>
      )}

      {/* ── Employees Table ───────────────────────────────────────────── */}
      {!loading && !error && employees.length > 0 && (
        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <span>👥 All Employees — {employees.length} record{employees.length !== 1 ? 's' : ''}</span>
            <button
              className="btn btn-sm btn-light"
              onClick={() => navigate('/employee-form')}
            >
              ➕ Add New
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" id="employees-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Location</th>
                    <th scope="col">Salary (₹)</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={emp._id}>
                      <td>
                        <span className="badge-id">{index + 1}</span>
                      </td>
                      <td className="fw-semibold">{emp.name}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.location}</td>
                      <td>₹{Number(emp.salary).toLocaleString('en-IN')}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {/* Edit button */}
                          <button
                            className="btn btn-sm btn-outline-primary"
                            id={`edit-btn-${emp._id}`}
                            onClick={() => handleEdit(emp._id)}
                            title="Edit this employee"
                          >
                            ✏️ Edit
                          </button>
                          {/* Delete button */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            id={`delete-btn-${emp._id}`}
                            onClick={() => handleDelete(emp._id, emp.name)}
                            disabled={deletingId === emp._id}
                            title="Delete this employee"
                          >
                            {deletingId === emp._id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                Deleting…
                              </>
                            ) : (
                              '🗑️ Delete'
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Data source: MongoDB Atlas via <code>GET /api/employees</code>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
