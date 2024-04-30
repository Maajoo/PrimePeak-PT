import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { HashRouter, Route } from "react-router-dom";

import Home from './components/Home.jsx';
import Training from './components/Training.jsx';
import Customer from './components/Customer.jsx';
import Calendar from './components/Calendar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
      <Route exact path="/" component={Home} />
      <Route path="/customer" component={Customer} />
      <Route path="/training" component={Training} />
      <Route path="/calendar" component={Calendar} />
  </HashRouter>,
)
