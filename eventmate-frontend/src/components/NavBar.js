import { Link, useNavigate } from 'react-router-dom'
import { removeToken, tokenExp } from '../tokenLogic/tokenLogic'

export default function NavBar(){
    const navigate = useNavigate()
    
    function logOut(){
        removeToken()
        navigate('/')
    }

    return(
        <nav>
            <Link to='/'>Home page</Link>
            &nbsp; | &nbsp;
            {tokenExp() && <Link to='/ProfilePage'>My Profile</Link>}
            &nbsp; | &nbsp;
            {!tokenExp() && <Link to='/Login'>Sign In</Link>}
            &nbsp; | &nbsp;
            {!tokenExp() && <Link to='/SignUp'>Sign Up</Link>}
            &nbsp; | &nbsp;
            {tokenExp() && <Link to='/CreateEventPage'>Create Event</Link>}
            &nbsp; | &nbsp;
            {tokenExp() && <button onClick={logOut}> LOG OUT </button>}
        </nav>
    )
}