/*
 * EmployeeForm.jsx  –  src/pages/EmployeeForm.jsx
 *
 * This page has TWO responsibilities:
 *
 *  PART A – The Form
 *    A controlled form with four fields:
 *      - Name        (text, required, min 2 characters)
 *      - Designation (text, required)
 *      - Location    (text, required)
 *      - Salary      (number, required, must be > 0)
 *
 *    "Controlled" means every input's value is stored in React state.
 *    When the user types, we update state. React re-renders with the
 *    new value – the input always shows exactly what is in state.
 *
 *  PART B – The Local Employee List
 *    After a valid submission the employee is added to an array in state.
 *    The list is displayed below the form.
 *    ⚠️  This list is NOT sent to any backend and will reset on page refresh.
 *
 * React hooks used:
 *  - useState : for form fields, validation errors, and the employee list.
 */

import React, { useState } from 'react'

// ── Helper: build an empty form state ──────────────────────────────────────
const emptyForm = {
  name:        '',
  designation: '',
  location:    '',
  salary:      '',
}

function EmployeeForm() {
  // ── State ──────────────────────────────────────────────────────────────
  // formData     : mirrors what is typed in each input
  // errors       : validation messages keyed by field name
  // employees    : list of successfully submitted employees (local only)
  // successMsg   : brief confirmation message shown after submission
  const [formData,    setFormData]    = useState(emptyForm)
  const [errors,      setErrors]      = useState({})
  const [employees,   setEmployees]   = useState([])
  const [successMsg,  setSuccessMsg]  = useState('')

  // ── Controlled input handler ───────────────────────────────────────────
  // Called on every keystroke. Updates only the field that changed.
  // e.target.name matches the "name" attribute on each <input>.
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear the error for this field as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ── Validation ────────────────────────────────────────────────────────
  // Returns an errors object. If the object is empty, the form is valid.
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

    if (!data.salary) {
      newErrors.salary = 'Salary is required.'
    } else if (Number(data.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number.'
    }

    return newErrors
  }

  // ── Form submission handler ───────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()   // Prevent the default page-reload behaviour

    // Run validation
    const validationErrors = validate(formData)

    if (Object.keys(validationErrors).length > 0) {
      // Errors found – show them and stop
      setErrors(validationErrors)
      setSuccessMsg('')
      return
    }

    // ✅ Valid – build the new employee record
    const newEmployee = {
      id:          employees.length + 1,     // simple sequential ID
      name:        formData.name.trim(),
      designation: formData.designation.trim(),
      location:    formData.location.trim(),
      salary:      Number(formData.salary),
    }

    // Add to the local list (no API call – data lives only in state)
    setEmployees((prev) => [...prev, newEmployee])

    // Reset the form
    setFormData(emptyForm)
    setErrors({})

    // Show a success message for 3 seconds, then hide it
    setSuccessMsg(`✅ "${newEmployee.name}" has been added to the list!`)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <h1>➕ Employee Form</h1>
        <p>Fill in the details below to add a new employee to the session list.</p>
      </div>

      {/* ── Success Alert ────────────────────────────────────────────── */}
      {successMsg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMsg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMsg('')}
            aria-label="Close"
          />
        </div>
      )}

      {/* ── The Form ─────────────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          📋 New Employee Details
        </div>
        <div className="card-body">
          {/*
            noValidate disables browser's built-in validation bubbles
            so our custom messages show instead.
          */}
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
                />
                {/* Show validation error only when errors.name is truthy */}
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
                />
                {errors.salary && (
                  <div className="invalid-feedback">{errors.salary}</div>
                )}
              </div>

            </div>{/* end .row */}

            {/* ── Submit button ──────────────────────────────────── */}
            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary px-4" id="submit-btn">
                ➕ Add Employee
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                id="reset-btn"
                onClick={() => { setFormData(emptyForm); setErrors({}) }}
              >
                🔄 Reset
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ── Local Employee List ───────────────────────────────────────── */}
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <span>👥 Added Employees (this session only)</span>
          {/* Badge shows the count */}
          <span className="badge bg-white text-success">{employees.length}</span>
        </div>
        <div className="card-body p-0">
          {employees.length === 0 ? (
            /* Empty state message */
            <div className="text-center text-muted py-5">
              <p className="mb-1 fs-5">📭 No employees added yet.</p>
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
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td><span className="badge-id">{emp.id}</span></td>
                      <td className="fw-semibold">{emp.name}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.location}</td>
                      <td>₹{emp.salary.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {employees.length > 0 && (
          <div className="card-footer text-muted small">
            ⚠️ This list is stored in React state only — it will reset when you refresh the page.
          </div>
        )}
      </div>

    </div>
  )
}

export default EmployeeForm
