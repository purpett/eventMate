import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPayloadFromToken, isLoggedIn } from "../tokenLogic/tokenLogic"
import { updateUser } from "../apis/UserApis"
// import { get } from "mongoose"

export default function EventPage() {
  // State to store the information about the event. Will store an object after the page is loaded
  const [singleEvent, setSingleEvent] = useState({ attendees: [] })
  const [editedEvent, setEditedEvent] = useState(singleEvent)

  // This state is used as a switch for the create comment form
  const [showCommentForm, setShowCommentForm] = useState(false)

  // This state is used as a switch for the edit event form
  const [showEventForm, setShowEventForm] = useState(false)

  // Grab the event Id from the url and store it in the variable called id.
  const { id } = useParams()

  // Function that calls the fetch request get one event and then sets it in the singleEvent state
  const getEvent = () => {
    getOneEvent(id)
      .then((event) => event.json())
      .then((data => setSingleEvent(data.event)))
      .catch((error) => console.log(error.message))
  }

  // On page load the function that grabs the event information is called and fed the id of the event.
  useEffect(() => {
    getEvent(id)
  }, [])

  const navigate = useNavigate()

  // Function to delete an event by its Id. It calls the destroy backend for that event.
  function deleteOneEvent() {
    deleteEvent(id)
      .then(() => navigate('/'))
      .catch((error) => console.log(error))
  }

  // Function to update one event. its fed the Id and the updated event information
  // changed so that it updates with any new info (even multiple at once )
  function updateOneEvent() {
    updateEvent(id, editedEvent)
      .then((event) => event.json())
      .then((data => setSingleEvent(data)))
      .catch((error) => console.log(error.message))
  }

  function addUserIdToAttendees() {
    const payloadFromToken = getPayloadFromToken()
    const userId = payloadFromToken.userId
    if (singleEvent.attendees.includes(userId)) {
      return
    } else {
      const attendees = [...singleEvent.attendees, userId]
      const eventData = { ...singleEvent, attendees: attendees }
      updateEvent(singleEvent._id, eventData)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then((data) => setSingleEvent(data.event))
      // setSingleEvent({ ...singleEvent, attendees: attendees })
    }
  }

  function handleInputOnChange(e) {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value })
  }

  function toggleForm() {
    setShowEventForm(!showEventForm)
  }

  return (
    <div>
      {!showEventForm && <div>
        {/* Checks to see if the fetch request is complete before showing the event information */}
        <p>Title: {singleEvent.title}</p>
        <p>Description: {singleEvent.description}</p>
        <p>Location: {singleEvent.location}</p>
        <p>Date: {singleEvent.date}</p>
        <p>Organiser: {singleEvent.organiser}</p>
        <p>People attending: {singleEvent.attendees.length} </p>
        <p>Tags:</p>
        {/* <button>Like/Fav</button> */}
        {/* Button that toggles the showCommentForm boolean state */}
        {isLoggedIn() && <button onClick={() => setShowCommentForm(!showCommentForm)}>Comment</button>}
        {isLoggedIn() && <button onClick={addUserIdToAttendees}>Attend</button>}
        <button onClick={toggleForm}>Edit Event</button>
        <button onClick={deleteOneEvent}>Delete Event</button>
        <hr />
      </div>}
      {showEventForm && <form onSubmit={updateOneEvent}>
        <input
          name='title'
          onChange={handleInputOnChange}
          placeholder={singleEvent.title}
        />
        <input
          name='location'
          onChange={handleInputOnChange}
          placeholder={singleEvent.location}
        />
        <input
          name='date'
          onChange={handleInputOnChange}
          placeholder={singleEvent.date}
        />
        <input
          name='description'
          onChange={handleInputOnChange}
          placeholder={singleEvent.description}
        />
        <button type="submit">Save changes</button>
      </form>}

      {/* If the showCommentForm is true to Comment form will appear and pass down the id of the event. */}
      {showCommentForm && <CreateCommentForm
        setSingleEvent={setSingleEvent}
        setShowCommentForm={setShowCommentForm}
        id={id} />}
      {/* This will be where the comments will be generated. The whole event information is passed down */}
      <Comments
        comments={singleEvent.comments}
        setSingleEvent={setSingleEvent}
        eventId={id}
      />
    </div>
  )
}