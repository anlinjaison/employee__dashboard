/*
 * app.js  –  Employee Dashboard Backend
 *
 * Node.js + Express server with MongoDB Atlas integration.
 *
 * API Endpoints:
 *  GET    /api/employees        → Retrieve ALL employees
 *  GET    /api/employees/:id    → Retrieve ONE employee by ID
 *  POST   /api/employees        → Add a NEW employee
 *  PUT    /api/employees/:id    → UPDATE an existing employee
 *  DELETE /api/employees/:id    → DELETE an employee
 *
 * The compiled React app (dist/) is served as static files on GET /
 *
 * Usage:
 *  1. Copy .env.example to .env and fill in your MONGODB_URI
 *  2. npm install
 *  3. node app.js
 */

// ── 1. Module Imports ───────────────────────────────────────────────────────
const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const path     = require('path')
require('dotenv').config()   // Load .env variables into process.env

// ── 2. Express App Initialisation ───────────────────────────────────────────
const app  = express()
const PORT = process.env.PORT || 5000

// ── 3. Middleware ───────────────────────────────────────────────────────────
app.use(cors())                   // Allow cross-origin requests (React dev server)
app.use(express.json())           // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true }))  // Parse URL-encoded bodies

// ── 4. MongoDB Atlas Connection ─────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employeeDB'

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅  Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message)
    process.exit(1)   // Exit if we cannot connect to DB
  })

// ── 5. Employee Schema & Model ──────────────────────────────────────────────
/*
 * Each employee document stores:
 *  name        – full name (required)
 *  designation – job title (required)
 *  location    – office location (required)
 *  salary      – monthly salary in INR (required, must be > 0)
 *  timestamps  – createdAt & updatedAt (auto-managed)
 */
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Employee name is required'],
      trim:      true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    designation: {
      type:     String,
      required: [true, 'Designation is required'],
      trim:     true,
    },
    location: {
      type:     String,
      required: [true, 'Location is required'],
      trim:     true,
    },
    salary: {
      type:     Number,
      required: [true, 'Salary is required'],
      min:      [1, 'Salary must be a positive number'],
    },
  },
  { timestamps: true }   // Adds createdAt & updatedAt automatically
)

const Employee = mongoose.model('Employee', employeeSchema)

// ── 6. API Routes ───────────────────────────────────────────────────────────

// ── GET /api/employees  →  Retrieve ALL employees ──────────────────────────
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count:   employees.length,
      data:    employees,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── GET /api/employees/:id  →  Retrieve ONE employee ───────────────────────
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }

    res.status(200).json({ success: true, data: employee })
  } catch (err) {
    // Invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── POST /api/employees  →  Add a NEW employee ─────────────────────────────
app.post('/api/employees', async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body

    const newEmployee = new Employee({ name, designation, location, salary })
    const savedEmployee = await newEmployee.save()

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data:    savedEmployee,
    })
  } catch (err) {
    // Mongoose validation errors (required fields, minlength, etc.)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── PUT /api/employees/:id  →  UPDATE an existing employee ─────────────────
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, designation, location, salary },
      {
        new:           true,   // Return the UPDATED document (not the old one)
        runValidators: true,   // Re-run schema validators on update
      }
    )

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data:    updatedEmployee,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── DELETE /api/employees/:id  →  DELETE a single employee ─────────────────
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)

    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }

    res.status(200).json({
      success: true,
      message: `Employee "${deletedEmployee.name}" deleted successfully`,
      data:    deletedEmployee,
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── 7. Serve React Frontend (dist/) ─────────────────────────────────────────
/*
 * In production, Express serves the compiled React app.
 * Any route that is NOT an API route will return index.html,
 * allowing React Router to handle client-side navigation.
 */
app.use(express.static(path.join(__dirname, 'dist')))

// Catch-all: return index.html for any non-API route (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// ── 8. Start the Server ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`)
  console.log(`📡  API base URL: http://localhost:${PORT}/api/employees`)
})
