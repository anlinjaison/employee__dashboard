/*
 * EmployeeForm.jsx  –  src/pages/EmployeeForm.jsx
 *
 * This page has TWO modes:
 *
 *  MODE A – ADD (default)
 *    A controlled form with four fields:
 *      - Name        (text, required, min 2 characters)
 *      - Designation (text, required)
 *      - Location    (text, required)
 *      - Salary      (number, required, must be > 0)
 *    On submit: sends POST /api/employees to save to MongoDB.
 *    On success: shows confirmation, clears form, reloads employee list.
 *
 *  MODE B – EDIT (when ?edit=<id> is present in the URL)
 *    Pre-fills the form with existing employee data fetched from
 *    GET /api/employees/:id.
 *    On submit: sends PUT /api/employees/:id to update the record.
 *    On success: navigates back to the Dashboard.
 *
 *  The list below the form always shows the latest data from MongoDB
 *  (not just this session).
 *
 * React hooks used:
 *  - useState       : form fields, validation, status messages, employee list
 *  - useEffect      : fetch employee list on mount & fetch employee for edit mode
 *  - useSearchParams: reads ?edit=<id> from the URL
 *  - useNavigate    : programmatic navigation back to Dashboard
 */

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// API base URL – Vite dev proxy forwards /api to http://localhost:5000
const API_BASE = '/api/employees'

// ── Helper: build an empty form state ──────────────────────────────────────
const emptyForm = {
  name:        '',
  designation: '',
  location:    '',
  salary:      '',
}

function EmployeeForm() {
  // ── Router hooks ────────────────────────────────────────────────────────
  const navigate      = useNavigate()
  const [searchParams] = useSearchParams()
  const editId        = searchParams.get('edit')   // null in ADD mode, ID string in EDIT mode

  // ── State ──────────────────────────────────────────────────────────────
  const [formData,    setFormData]    = useState(emptyForm)
  const [errors,      setErrors]      = useState({})
  const [employees,   setEmployees]   = useState([])      // list below the form
  const [successMsg,  setSuccessMsg]  = useState('')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [submitting,  setSubmitting]  = useState(false)  // disable button while saving
  const [listLoading, setListLoading] = useState(true)   // loading state for the list
  const [prefilling,  setPrefilling]  = useState(false)  // loading state for edit pre-fill

  // ── Fetch all employees for the list section ─────────────────────────
  const fetchEmployees = useCallback(async () => {
    try {
      setListLoading(true)
      const response = await fetch(API_BASE)
      if (!response.ok) throw new Error(`Server returned ${response.status}`)
      const json = await response.json()
      setEmployees(json.data || [])
    } catch (err) {
      console.error('Failed to load employee list:', err.message)
    } finally {
      setListLoading(false)
    }
  }, [])

  // On mount: load the list and, if in edit mode, prefill the form
  useEffect(() => {
    fetchEmployees()

    if (editId) {
      prefillForm(editId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId])

  // ── Pre-fill form when in Edit mode ──────────────────────────────────
  async function prefillForm(id) {
    try {
      setPrefilling(true)
      const response = await fetch(`${API_BASE}/${id}`)
      if (!response.ok) {
        throw new Error('Employee not found. It may have been deleted.')
      }
      const json = await response.json()
      const emp  = json.data
      setFormData({
        name:        emp.name,
        designation: emp.designation,
        location:    emp.location,
        salary:      emp.salary,
      })
    } catch (err) {
      setErrorMsg(`⚠️ Could not load employee for editing: ${err.message}`)
    } finally {
      setPrefilling(false)
    }
  }

  // ── Controlled input handler ────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear the error for this field as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ── Client-side validation ───────────────────────────────────────────
  function validate(data) {
    const newErrors = {}

    if (!data.name.trim()) {
      newErrors.name = 'Name is required.'
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    }

    if (!data.designation.trim()) {
      newErrors.designation = 'Designation is required.'
    }

    if (!data.location.trim()) {
      newErrors.location = 'Location is required.'
    }

    if (!String(data.salary).trim()) {
      newErrors.salary = 'Salary is required.'
    } else if (Number(data.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number.'
    }

    return newErrors
  }

  // ── Form submission handler ──────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMsg('')
      setErrorMsg('')
      return
    }

    setSubmitting(true)
    setSuccessMsg('')
    setErrorMsg('')

    try {
      const payload = {
        name:        formData.name.trim(),
        designation: formData.designation.trim(),
        location:    formData.location.trim(),
        salary:      Number(formData.salary),
      }

      const url    = editId ? `${API_BASE}/${editId}` : API_BASE
      const method = editId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || 'Something went wrong. Please try again.')
      }

      if (editId) {
        // In edit mode: show success then navigate back to dashboard
        setSuccessMsg(`✅ "${payload.name}" updated successfully!`)
        setTimeout(() => navigate('/'), 1500)
      } else {
        // In add mode: clear form and refresh the list
        setFormData(emptyForm)
        setErrors({})
        setSuccessMsg(`✅ "${payload.name}" added to the database!`)
        await fetchEmployees()
        setTimeout(() => setSuccessMsg(''), 4000)
      }
    } catch (err) {
      setErrorMsg(`❌ ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Cancel edit ──────────────────────────────────────────────────────
  function handleCancel() {
    navigate('/')
  }

  // ── Render ──────────────────────────────────────────────────────────
  const isEditMode = Boolean(editId)

  return (
    <div>

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <h1>{isEditMode ? '✏️ Edit Employee' : '➕ Add Employee'}</h1>
        <p>
          {isEditMode
            ? 'Update the employee details below. Changes are saved to MongoDB.'
            : 'Fill in the details below to add a new employee to MongoDB.'}
        </p>
      </div>

      {/* ── Global Success Alert ────────────────────────────────────── */}
      {successMsg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMsg}
          <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
        </div>
      )}

      {/* ── Global Error Alert ──────────────────────────────────────── */}
      {errorMsg && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMsg}
          <button type="button" className="btn-close" onClick={() => setErrorMsg('')} aria-label="Close" />
        </div>
      )}

      {/* ── Pre-fill loading spinner (edit mode only) ───────────────── */}
      {prefilling && (
        <div className="d-flex align-items-center text-muted py-3">
          <div className="spinner-border spinner-border-sm me-2" role="status" />
          Loading employee data…
        </div>
      )}

      {/* ── The Form ─────────────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className={`card-header ${isEditMode ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
          {isEditMode ? '📝 Edit Employee Details' : '📋 New Employee Details'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate id="employee-form">
            <div className="row g-3">

              {/* ── Name ─────────────────────────────────────────── */}
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={prefilling}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* ── Designation ──────────────────────────────────── */}
              <div className="col-md-6">
                <label htmlFor="designation" className="form-label">
                  Designation <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                  placeholder="e.g. Software Engineer"
                  value={formData.designation}
                  onChange={handleChange}
                  disabled={prefilling}
                />
                {errors.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
              </div>

              {/* ── Location ─────────────────────────────────────── */}
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  placeholder="e.g. Mumbai"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={prefilling}
                />
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </div>

              {/* ── Salary ───────────────────────────────────────── */}
              <div className="col-md-6">
                <label htmlFor="salary" className="form-label">
                  Monthly Salary (₹) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                  placeholder="e.g. 50000"
                  min="1"
                  value={formData.salary}
                  onChange={handleChange}
                  disabled={prefilling}
                />
                {errors.salary && (
                  <div className="invalid-feedback">{errors.salary}</div>
                )}
              </div>

            </div>{/* end .row */}

            {/* ── Action Buttons ──────────────────────────────────── */}
            <div className="mt-4 d-flex gap-2 flex-wrap">
              <button
                type="submit"
                className={`btn ${isEditMode ? 'btn-warning' : 'btn-primary'} px-4`}
                id="submit-btn"
                disabled={submitting || prefilling}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    {isEditMode ? 'Updating…' : 'Saving…'}
                  </>
                ) : (
                  isEditMode ? '💾 Save Changes' : '➕ Add Employee'
                )}
              </button>

              {isEditMode ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  id="cancel-btn"
                  onClick={handleCancel}
                >
                  ✖ Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  id="reset-btn"
                  onClick={() => { setFormData(emptyForm); setErrors({}) }}
                  disabled={submitting}
                >
                  🔄 Reset
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

      {/* ── Employee List (Add mode only) ──────────────────────────────── */}
      {!isEditMode && (
        <div className="card">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <span>👥 All Employees (MongoDB)</span>
            <span className="badge bg-white text-success">{employees.length}</span>
          </div>
          <div className="card-body p-0">
            {listLoading ? (
              <div className="d-flex justify-content-center align-items-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm me-2" role="status" />
                Loading…
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center text-muted py-5">
                <p className="mb-1 fs-5">📭 No employees yet.</p>
                <small>Fill in the form above and click "Add Employee".</small>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0" id="employees-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Location</th>
                      <th>Salary (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, index) => (
                      <tr key={emp._id}>
                        <td><span className="badge-id">{index + 1}</span></td>
                        <td className="fw-semibold">{emp.name}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.location}</td>
                        <td>₹{Number(emp.salary).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {employees.length > 0 && (
            <div className="card-footer text-muted small">
              Showing {employees.length} employee{employees.length !== 1 ? 's' : ''} from MongoDB Atlas
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default EmployeeForm
