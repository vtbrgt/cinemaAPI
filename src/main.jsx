import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import Home from './routes/Home'
import Terror from './routes/Terror'
import Filme from './routes/Filme'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/terror",
        element: <Terror/>
      },
      {
        path: "/terror/:id",
        element: <Filme/>
      },

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
