/*
 * main.jsx
 *
 * This is the ENTRY POINT of the React application.
 *
 * What it does:
 *  1. Imports React and ReactDOM so we can render components.
 *  2. Imports BrowserRouter from react-router-dom so we can use
 *     client-side routing (the URL changes without a full page reload).
 *  3. Imports our global CSS.
 *  4. Imports our root <App /> component.
 *  5. Mounts the entire React tree inside the <div id="root"> element
 *     that lives in index.html.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'   // Global styles
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode runs extra checks in development – harmless in production.
  <React.StrictMode>
    {/*
      BrowserRouter wraps the whole app so that every component inside
      can use hooks like useNavigate() and components like <Link>.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
