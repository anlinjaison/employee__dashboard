/*
 * Navbar.jsx  –  src/components/Navbar.jsx
 *
 * A responsive Bootstrap 5 navigation bar.
 *
 * Key concepts:
 *  - We use React Router's <NavLink> instead of <a> tags.
 *    <NavLink> automatically adds an "active" CSS class to the link
 *    whose path matches the current URL, giving visual feedback.
 *  - Bootstrap's navbar-toggler button collapses the menu on small
 *    screens (the hamburger ☰ icon).
 *  - data-bs-* attributes are Bootstrap 5 JavaScript directives –
 *    they work because we loaded the Bootstrap JS bundle in index.html.
 */

import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        {/* ── Brand / Logo ───────────────────────────────────── */}
        <NavLink className="navbar-brand" to="/">
          {/* A small emoji icon gives a friendly touch */}
          📊 Employee Dashboard
        </NavLink>

        {/* ── Hamburger button (visible only on small screens) ─ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"         /* points to the collapsible div below */
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ── Collapsible link list ───────────────────────────── */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          {/* ms-auto pushes links to the right on large screens */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* Home link */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  /* isActive is true when the URL matches this route */
                  'nav-link' + (isActive ? ' active fw-semibold' : '')
                }
                to="/"
                end   /* "end" means only match exactly "/" not "/anything" */
              >
                🏠 Home
              </NavLink>
            </li>

            {/* Employee Form link */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active fw-semibold' : '')
                }
                to="/employee-form"
              >
                ➕ Employee Form
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
