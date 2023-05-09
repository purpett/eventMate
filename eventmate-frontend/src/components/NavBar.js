import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../tokenLogic/tokenLogic'

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
            <Link to='/ProfilePage'>My Profile</Link>
            &nbsp; | &nbsp;
            <Link to='/Login'>Sign In</Link>
            &nbsp; | &nbsp;
            <Link to='/SignUp'>Sign Up</Link>
            &nbsp; | &nbsp;
            <Link to='/CreateEventPage'>Create Event</Link>
            &nbsp; | &nbsp;
            <button onClick={logOut}> LOG OUT </button>
        </nav>
    )
}