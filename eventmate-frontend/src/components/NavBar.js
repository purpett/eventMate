import { Link, useNavigate } from 'react-router-dom'
import { removeToken, tokenExp } from '../tokenLogic/tokenLogic'

export default function NavBar() {
  const navigate = useNavigate()


  function logOut() {
    removeToken()
    navigate('/')
  }

  return (
    <div className='navbar'>
      <nav className='navbar-content'>
        <div id="logo"><Link to='/'>eventMate</Link></div>
        <div className='nav-links-container'>
          {tokenExp() &&
            <div>
              <Link to='/CreateEventPage' className='nav-link'>Create Event</Link>
              <Link to='/ProfilePage' className='nav-link'>My Profile</Link>
              <button onClick={logOut} class='danger-btn'> LOG OUT </button>
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


