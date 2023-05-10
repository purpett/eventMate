
import { useState, useEffect } from 'react'
import { getUser, deleteUser, getAllEventsWithUserId } from '../apis/UserApis'
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'
import UserEvent from './UserEvent'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {

  const [userEvents, setUserEvents] = useState([])
  const [currentUser, setCurrentUser] = useState({ username: '', attending: [] })

  // Load the getUser api specific to the user id on page load
  useEffect(() => {
    const payload = getPayloadFromToken()
    getUser(payload.userId)
      .then(user => user.json())
      .then((data) => {
        setCurrentUser(data.user.username)
      })

    findEventsByUserId()
  }, [])

  // Function to call the deleteUser api
  function deleteUserProfile() {
    const payload = getPayloadFromToken()
    deleteUser(payload.userId)
      .then(deletedUser => deletedUser.json())
    // .then(data => console.log(data))
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
    <>
      <h1>Profile</h1>
      <div>
        {currentUser.username}
      </div>

      <div>
        <button onClick={findEventsByUserId}>Give me event</button>
      </div>

      <button onClick={deleteUserProfile}>Delete account</button>

      <h2>Upcoming events</h2>
      {upcoming.map((event) => <UserEvent event={event} key={event._id} />)}

      <hr />
      <h2>Past events</h2>
      {past.map((event) => <UserEvent event={event} key={event._id} />)}
    </>
  )
}