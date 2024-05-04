import { NavLink } from 'react-router-dom'
import './App.css'
import logo from "./primepeak-logo.svg"

function App() {

  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

        <NavLink to="/"><img src={logo} alt="Logo"
          className='Logo'
          style={{
            height: 300, width: 300,
            position: 'relative',
            zIndex: 2
          }}
        /></NavLink>

        <div className="navbg">
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/customer">CUSTOMER</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/training">TRAINING</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/calendar">CALENDAR</NavLink>
        </div>
      </div>
    </div >
  )
}

export default App