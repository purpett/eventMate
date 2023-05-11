
import { useState, useEffect } from 'react'
import { getUser, deleteUser, getAllEventsWithUserId } from '../apis/UserApis'
import { getPayloadFromToken, removeToken } from '../tokenLogic/tokenLogic'
import UserEvent from './UserEvent'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {

  const [userEvents, setUserEvents] = useState([])
  // State to store the user information
  const [currentUser, setCurrentUser] = useState({ username: '', attending: [] })
  const navigate = useNavigate()

  // Load the getUser api specific to the user id on page load
  useEffect(() => {
    // Grabs payload from cookie in local storage
    const payload = getPayloadFromToken()
    // Uses the Id from the payload to get the user information from the backend
    getUser(payload.userId)
      .then(user => user.json())
      .then((data) => {
        // Sets the current user state
        setCurrentUser({ username: data.user.username })
      }).catch(() => {
        // If there is an error remove the token and navigat the user back to the login page.
        removeToken()
        navigate('../login')
      })

      // Function to get all of a users events
    findEventsByUserId()
  }, [])

  // Function to call the deleteUser api
  // Log out and navigate to homepage. 
  function deleteUserProfile() {
    const payload = getPayloadFromToken()
    deleteUser(payload.userId)
      .then(deletedUser => deletedUser.json())
    removeToken()
    navigate('/')
  }

  // Finding all events by user id 
  function findEventsByUserId() {
    const payload = getPayloadFromToken()
    getAllEventsWithUserId(payload.userId)
      .then((response) => response.json())
      .then((data) => setUserEvents(data.events))
  }

  //add functionality to show upcoming and past events
  function upcomingOrPastEvents(array) {
    const now = new Date();
    // Filters the users events by if the date is after the current date then stores it in a variable
    const upcoming = array.filter((event) => new Date(event.date) >= now);
    // Filters the users events by if the date is before the current date then stores it in a variable
    const past = array.filter((event) => new Date(event.date) < now);
    return { upcoming, past };
  }

  const { upcoming, past } = upcomingOrPastEvents(userEvents)

  return (
    <div className='profile-page'>
      <div className='user-area'>
        <div id="profile-username">
          {currentUser.username}
        </div>
        <button className="danger-btn" onClick={deleteUserProfile}>Delete account</button>
      </div>
      <h2>Upcoming events</h2>
      {/* Maps over upcoming events */}
      {upcoming.map((event) => <UserEvent event={event} key={event._id} />)}

      <hr />
      <h2>Past events</h2>
      {/* Maps over past events */}
      {past.map((event) => <UserEvent event={event} key={event._id} />)}
    </div>
  )
}