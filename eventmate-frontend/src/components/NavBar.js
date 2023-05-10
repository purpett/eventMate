import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../tokenLogic/tokenLogic'

export default function NavBar() {
  const navigate = useNavigate()

  function logOut() {
    removeToken()
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <Link to='/' id="logo">eventMate</Link>
      <div className='nav-links-container'>
        {isLoggedIn() &&
          <div className=''>
            <Link to='/CreateEventPage' className='nav-link'>Create Event</Link>
            <Link to='/ProfilePage' className='nav-link'>My Profile</Link>
            <button onClick={logOut} id='log-out-btn'> LOG OUT </button>
          </div>
        }
        {!isLoggedIn() &&
          <div>
            <Link to='/Login' className='nav-link'>Sign In</Link>
            <Link to='/SignUp' className='nav-link'>Sign Up</Link>
          </div>
        }
      </div>
    </nav>
  )
}

// maybe group stuff together? 
