import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App env="prod"/>
  },
  {
    path: "/dev",
    element: <App env="dev"/>
  }, {
    path: "*",
    element: <Navigate to="/" replace />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
