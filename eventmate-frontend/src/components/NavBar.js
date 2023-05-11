import { Link, useNavigate } from 'react-router-dom'
import { removeToken, tokenExp } from '../tokenLogic/tokenLogic'

export default function NavBar() {
  const navigate = useNavigate()

  // Function to clear the token from local storage and navigate the user back to the homepage
  function logOut() {
    removeToken()
    navigate('/')
  }

  return (
    <div className='navbar'>
      <nav className='navbar-content'>
        <div id="logo"><Link to='/'>eventMate</Link></div>
        <div className='nav-links-container'>
          {/* Checks if the token is in local storage and is not expired. If it is then shows this part of the nav bar if it is not it shows the other section of the nav bar. */}
          {tokenExp() &&
            <div>
              <Link to='/CreateEventPage' className='nav-link'>Create Event</Link>
              <Link to='/ProfilePage' className='nav-link'>My Profile</Link>
              <button onClick={logOut} className='danger-btn'> LOG OUT </button>
            </div>
          }
          {!tokenExp() &&
            <div>
              <Link to='/Login' className='nav-link'>Login</Link>
              <Link to='/SignUp' className='nav-link'>Sign Up</Link>
            </div>
          }
        </div>
      </nav>
      <hr />
    </div>
  )
}


