import { Link } from 'react-router-dom'

export default function NavBar(){

    return(
        <nav>
            <Link to='/'>Home page</Link>

            <Link to='/ProfilePage'></Link>
            <Link to='/Login'></Link>
            <Link to='/SignUp'></Link>
            <Link to='/CreateEventPage'>Create Event</Link>

            
            <button> LOG OUT </button>
        </nav>
    )
}