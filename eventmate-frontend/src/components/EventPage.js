import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getPayloadFromToken, isLoggedIn, isOrganiser } from "../tokenLogic/tokenLogic"
import transformDate from '../transformDate'



export default function EventPage() {
  // State to store the information about the event. Will store an object after the page is loaded
  const [singleEvent, setSingleEvent] = useState({ attendees: [], date: "" })
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
  useEffect(() => { getEvent(id) }, [])

  useEffect(() => {
    setEditedEvent({
      ...singleEvent,
      date: singleEvent.date.split("T")[0]
    })
  }, [singleEvent])

  const navigate = useNavigate()

  // Function to delete an event by its Id. It calls the destroy backend for that event.
  function deleteOneEvent() {
    deleteEvent(id)
      .then(() => navigate('/'))
      .catch((error) => console.log(error))
  }

  // Function to update one event. its fed the Id and the updated event information
  // changed so that it updates with any new info (even multiple at once )
  function updateOneEvent(id, editedEvent) {
    updateEvent(id, editedEvent)
      .then((event) => event.json())
      .then((data => setSingleEvent(data.event)))
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
      updateOneEvent(eventData._id, eventData)
    }
  }

  function handleInputOnChange(e) {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value })
  }

  function toggleForm() {
    setShowEventForm(!showEventForm)
  }

  return (
    <div className="event-page">
      {!showEventForm && <div className="event-content">
        {/* Checks to see if the fetch request is complete before showing the event information */}
        <p>Title: {singleEvent.title}</p>
        <p>Description: {singleEvent.description}</p>
        <p>Location: {singleEvent.location}</p>
        <p>Date: {transformDate(singleEvent.date)}</p>
        <p>Organiser: {singleEvent.organiser}</p>
        <p>People attending: {singleEvent.attendees.length} </p>
        {/* <p>Tags:</p> */}
        {/* <button>Like/Fav</button> */}
        {/* Button that toggles the showCommentForm boolean state */}
        {isLoggedIn() && <button onClick={() => setShowCommentForm(!showCommentForm)}>Comment</button>}
        {isLoggedIn() && <button onClick={addUserIdToAttendees}>Attend</button>}
        {isLoggedIn() && isOrganiser(singleEvent.organiser) && <button onClick={toggleForm}>Edit Event</button>}
        {isLoggedIn() && isOrganiser(singleEvent.organiser) && <button onClick={deleteOneEvent}>Delete Event</button>}
        <hr />
      </div>}
      {showEventForm && <form className="edit-event-form" onSubmit={() => updateOneEvent(id, editedEvent)}>

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
          type="date"
          onChange={handleInputOnChange}
          min={new Date().toISOString().split("T")[0]}
          placeholder={singleEvent.date ? new Date(singleEvent.date).toLocaleDateString() : ''}
          value={editedEvent.date}
        />
        <textarea
          name='description'
          onChange={handleInputOnChange}
          placeholder={singleEvent.description}
        />
        <button type="submit">Save changes</button>
      </form>}

      <div className="comments-container">
        {/* If the showCommentForm is true to Comment form will appear and pass down the id of the event. */}
        <div className="create-comment-form">
          {showCommentForm && <CreateCommentForm
            setSingleEvent={setSingleEvent}
            setShowCommentForm={setShowCommentForm}
            id={id} />}
        </div>
        {/* This will be where the comments will be generated. The whole event information is passed down */}
        <Comments
          comments={singleEvent.comments}
          setSingleEvent={setSingleEvent}
          eventId={id}
        />
      </div>
    </div>
  )
}