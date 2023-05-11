import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


import { getPayloadFromToken, tokenExp, isOrganiser } from "../tokenLogic/tokenLogic"
import transformDate from '../transformDate'

export default function EventPage() {
  // State to store the information about the event. Will store an object after the page is loaded
  const [singleEvent, setSingleEvent] = useState({ attendees: [], date: "" })
  const [editedEvent, setEditedEvent] = useState(singleEvent)

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

  // Ensures editedEvents is the same as single events. This is to make sure when someone is added to attending edited events also gets the update.
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

  // Function to add a user's id to the event attendees array. 
  function addUserIdToAttendees() {
    // Grabs payload from local storage and saves in variable
    const payloadFromToken = getPayloadFromToken()
    // Stores userid key value from the variable above in another variable
    const userId = payloadFromToken.userId
    // Checks to see if the userid is already in the attendees list and if it is then nothing happens
    if (singleEvent.attendees.includes(userId)) {
      return
      // Else all the current attendees are spread into an array with the userid added in and this is stored in a variable called attendees.
    } else {
      const attendees = [...singleEvent.attendees, userId]
      // singleEvent state is spread into an object and the attendees key is updated with the new attendees array.
      const eventData = { ...singleEvent, attendees: attendees }
      // We update the backend with the new event data.
      updateOneEvent(eventData._id, eventData)
    }
  }

  // Function to handle the changes in the input fields its dynamic so can be used on multiple fields as long as the input box's name matches the key name in edited event
  function handleInputOnChange(e) {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value })
  }

  // Toggle to show the create event form flips the eventForm from false to true and vice versa.
  function toggleForm() {
    setShowEventForm(!showEventForm)
  }

  return (
    <div className="event-page">
      {/* Checks if event form is false before it renders the information */}
      {!showEventForm && <div className="event-content">
        <p className="title">{singleEvent.title}</p>
        <p>Description: {singleEvent.description}</p>
        <p>Location: {singleEvent.location}</p>
        <p>Date: {transformDate(singleEvent.date)}</p>
        <p>Organiser: {singleEvent.organiser}</p>
        <p>People attending: {singleEvent.attendees.length} </p>
        {/* If there is a token in local storage and it is not expired the button to attend will appear */}
        {tokenExp() && <button onClick={addUserIdToAttendees}>Attend</button>}
        {/* If there is a token in local storage and it is not expired and the current user is the organiser then the edit event button and the delete event button will appear */}
        {tokenExp() && isOrganiser(singleEvent.organiser) && <button onClick={toggleForm}>Edit Event</button>}
        {tokenExp() && isOrganiser(singleEvent.organiser) && <button onClick={deleteOneEvent}>Delete Event</button>}
        <hr />
      </div>}
      {/* If edit event form is true then the below form will appear */}
      {showEventForm && <form className="edit-event-form" onSubmit={() => updateOneEvent(id, editedEvent)}>

        <input
          name='title'
          value={editedEvent.title}
          onChange={handleInputOnChange}
        />
        <input
          name='location'
          value={editedEvent.location}
          onChange={handleInputOnChange}
        />
        <input
          name='date'
          type="date"
          onChange={handleInputOnChange}
          min={new Date().toISOString().split("T")[0]}
          value={editedEvent.date}
        />
        <textarea
          name='description'
          value={editedEvent.description}
          onChange={handleInputOnChange}
          placeholder={singleEvent.description}
        />
        <button type="submit">Save changes</button>
      </form>}

      <div className="comments-container">
        COMMENTS
        {/* If the there is a valid token in local storage and it has not expired show the create comment form */}
        {tokenExp() && <div className="create-comment-form">
          <CreateCommentForm
            setSingleEvent={setSingleEvent}
            id={id} />
        </div>}
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