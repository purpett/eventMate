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

      <div className="event-container">
        {!showEventForm && <div className="event-content">
          {/* Checks to see if the fetch request is complete before showing the event information */}
          <p className="title">{singleEvent.title}</p>
          <p className="organiser">Planner: {singleEvent.organiser}</p>
          <div className="where">
            <img src="/media/map-marker-radius.svg" alt="map marker icon" />
            {singleEvent.location}
          </div>
          <div className="when">
            <img src="/media/calendar-month-outline.svg" alt="calendar icon" />
            {transformDate(singleEvent.date)}
          </div>
          <div className="description">{singleEvent.description}</div>
        </div>}
        {showEventForm && <form className="edit-event-form" onSubmit={() => updateOneEvent(id, editedEvent)}>
          <div className="edit-event-form-input">
            <label>Title</label>
            <input
              name='title'
              onChange={handleInputOnChange}
              value={editedEvent.title}
            />
          </div>
          <div className="where-and-when">
            <div className="edit-event-form-input">
              <label>Where</label>
              <input
                name='location'
                onChange={handleInputOnChange}
                value={editedEvent.location}
              />
            </div>
            <div className="edit-event-form-input">
              <label>When</label>
              <input
                name='date'
                type="date"
                onChange={handleInputOnChange}
                min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                placeholder={singleEvent.date ? new Date(singleEvent.date).toLocaleDateString() : ''}
                value={editedEvent.date}
              />
            </div>
          </div>
          <div className="edit-event-form-input">
            <label>Description</label>
            <textarea
              name='description'
              onChange={handleInputOnChange}
              value={editedEvent.description}
            />
          </div>
          <button className="normal-btn" type="submit">Save changes</button>
        </form>}
        <div className="event-actions-area">
          <div className="event-btns">
            {tokenExp() && isOrganiser(singleEvent.organiser) && <button className="normal-btn" onClick={toggleForm}>Edit Event</button>}
            {tokenExp() && isOrganiser(singleEvent.organiser) && <button className="danger-btn" onClick={deleteOneEvent}>Delete Event</button>}
          </div>
          <div className="attending-area">
            <p>People attending: {singleEvent.attendees.length} </p>
            {tokenExp() && <button className="normal-btn" id="attend-btn" onClick={addUserIdToAttendees}>Attend</button>}
          </div>
        </div>
      </div>

    


      <hr />
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