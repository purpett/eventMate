import { Link } from 'react-router-dom'

export default function NavBar(){

    return(
        <nav>
            <Link to='/'>Home page</Link>
            &nbsp; | &nbsp;
            <Link to='/ProfilePage'></Link>
            &nbsp; | &nbsp;
            <Link to='/Login'>Sign In</Link>
            &nbsp; | &nbsp;
            <Link to='/SignUp'>Sign Up</Link>
            &nbsp; | &nbsp;
            <Link to='/CreateEventPage'>Create Event</Link>
            &nbsp; | &nbsp;

            
            <button> LOG OUT </button>
        </nav>
    )
}