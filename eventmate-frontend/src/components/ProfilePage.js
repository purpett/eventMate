
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
        setUserEvents(data.user.attending);
        setCurrentUser(data.user.username)
      })
  }, [])

  // Function to call the deleteUser api
  function deleteUserProfile() {
    const payload = getPayloadFromToken()
    deleteUser(payload.userId)
      .then(deletedUser => deletedUser.json())
      .then(data => console.log(data))
  }

  // Finding all events by user id 
  function findEventsByUserId() {
    const payload = getPayloadFromToken()
    getAllEventsWithUserId(payload.userId)
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  //add functionality to show upcoming and past events
  function upcomingOrPastEvents(array) {
    const upcoming = array.filter((event) => event.date >= Date.now)
    const past = array.filter((event) => event.date < Date.now)
    return { upcoming, past }
  }

  // const { upcoming, past } = upcomingOrPastEvents()

  return (
    <>
      <h1>Profile</h1>
      <div>
        {currentUser.username}
        <button>Edit profile</button>
      </div>

      <div>
        <button onClick={findEventsByUserId}>Give me event</button>
      </div>

      <button onClick={deleteUserProfile}>Delete account</button>

      {userEvents.length ? userEvents.map((event) => {
        return <UserEvent event={event} key={event._id} />
      }
      ) : null}

    </>

  )

}