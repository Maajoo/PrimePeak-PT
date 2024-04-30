import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HashRouter } from "react-router-dom";


import Home from './components/Home.jsx';
import Training from './components/Training.jsx';
import Customer from './components/Customer.jsx';
import Calendar from './components/Calendar.jsx'

const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [                       // children are nested routes with a route
      {
        element: <Home />,
        index: true                   // index route does not need any path
      },
      {
        path: "customer",                // path can be defined relative to the parent path
        element: <Customer />,
      },
      {
        path: "training",
        element: <Training />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <RouterProvider router={router} />
  </HashRouter>,
)
