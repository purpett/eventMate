
import { useState, useEffect } from 'react'
import { getUser, deleteUser, getAllEventsWithUserId } from '../apis/UserApis'
import { getPayloadFromToken, removeToken } from '../tokenLogic/tokenLogic'
import UserEvent from './UserEvent'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {

  const [userEvents, setUserEvents] = useState([])
  const [currentUser, setCurrentUser] = useState({ username: '', attending: [] })
  const navigate = useNavigate()

  // Load the getUser api specific to the user id on page load
  useEffect(() => {
    const payload = getPayloadFromToken()
    getUser(payload.userId)
      .then(user => user.json())
      .then((data) => {
        setCurrentUser({ username: data.user.username })
      }).catch(() => {
        removeToken()
        navigate('../login')
      })

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
    const upcoming = array.filter((event) => new Date(event.date) >= now);
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
      {upcoming.map((event) => <UserEvent event={event} key={event._id} />)}

      <hr />
      <h2>Past events</h2>
      {past.map((event) => <UserEvent event={event} key={event._id} />)}
    </div>
  )
}