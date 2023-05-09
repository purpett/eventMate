import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadToken, getPayloadFromToken } from "../tokenLogic/tokenLogic"
import { updateUser } from "../apis/UserApis"

export default function EventPage() {
  // State to store the information about the event. Will store an object after the page is loaded
  const [singleEvent, setSingleEvent] = useState({})

  // This state is used as a switch for the create comment form
  const [showForm, setShowForm] = useState(false)

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

  // For testing purposes
  const updatedEvent = {
    title: 'Another event'
  }

  // changed so that it updates with any new info (even multiple at once )
  function updateOneEvent() {
    updateEvent(id, updatedEvent)
      .then((event) => event.json())
      .then((data => setSingleEvent(data)))
  }

  function addEventIdToUser() {
    const token = loadToken();
    const payloadFromToken = getPayloadFromToken(token)
    const changes = {
      attending: singleEvent._id
    }
    console.log(changes)

    updateUser(payloadFromToken.userId, changes)
      .then((results) => results.json())
    // .then((data) => console.log(data))

  }

  return (
    <div>
      <div>
        {/* Checks to see if the fetch request is complete before showing the event information */}
        <p>Title: {singleEvent ? singleEvent.title : null}</p>
        <p>Description: {singleEvent ? singleEvent.description : null}</p>
        <p>Location: {singleEvent ? singleEvent.location : null}</p>
        <p>Date: {singleEvent ? singleEvent.date : null}</p>
        <p>Organiser: {singleEvent ? singleEvent.organiser : null}</p>
        <p>Tags:</p>
        <button>Like/Fav</button>
        {/* Button that toggles the showForm boolean state */}
        <button
          onClick={() => setShowForm(!showForm)}
        >Comment</button>
        <button onClick={addEventIdToUser}>I Want to Attend</button>
        <hr />
      </div>
      <button onClick={deleteOneEvent}>Delete Event</button>
      <button onClick={updateOneEvent}>Update Event</button>

      {/* If the showForm is true to Comment form will appear and pass down the id of the event. */}
      {showForm && <CreateCommentForm
        setSingleEvent={setSingleEvent}
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