import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
      <div style={{ backgroundColor: "black", color: "white", padding: 20, font: "caption", fontSize: 30 }}>
        <h1>Prime Peak</h1>
        <h3>Personal training</h3>
      </div>
      <nav style={{ font: "caption" }}>
        <Link to={"/"}>Home</Link>{' '}
        <Link to={"/customer"}>Customer</Link>{' '}
        <Link to={"/training"}>Training</Link>{' '}
        <Link to={"/calendar"}>Calendar</Link>{' '}
      </nav>
      <Outlet />
    </>
  )
}

export default App
