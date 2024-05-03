import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from './components/Home.jsx';
import Training from './components/Training.jsx';
import Customer from './components/Customer.jsx';
import Calendar from './components/Calendar.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/training" element={<Training />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  </HashRouter>,
)
