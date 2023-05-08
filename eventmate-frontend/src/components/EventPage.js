import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function EventPage() {
  // State to store the information about the event. Will store an object after the page is loaded
  const [singleEvent, setSingleEvent] = useState([])
  const [commentArray, setCommentArray] = useState([])
  // This state is used as a switch for the create comment form
  const [createACommentForm, SetCreateACommentForm] = useState(false)
  // Grab the event Id from the url and store it in the variable called id.
  const { id } = useParams()

  // Function that calls the fetch request get one event and then sets it in the singleEvent state
  const giveOneEvent = useCallback(() => {
    getOneEvent(id)
      .then((event) => event.json())
      .then((data => setSingleEvent(data.event)))
      .catch((error) => console.log(error.message))
  }, [])

    // On page load the function that grabs the event information is called and fed the id of the event.
  useEffect(() => {
    giveOneEvent(id)
  }, [])

  useEffect(() => {
    setCommentArray(singleEvent.comments)
  }, [singleEvent])

  // For testing purposes
  const updatedEvent = {
    title: 'Another event'
  }

  const navigate = useNavigate()

  // Function to delete an event by its Id. It calls the destroy backend for that event.
  function deleteOneEvent() {
    deleteEvent(id)
      .then((deletedEvent) => deletedEvent.json())
      .then((data => navigate('/')))
      .catch((error) => console.log(error))
  }

  // Function to update one event. its fed the Id and the updated event information
  function updateOneEvent() {
    updateEvent(id, updatedEvent)
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  function commentsToShow(allTheComments) {
    setCommentArray([...allTheComments])
  }

  return (
    <div>
      <div>
        {/* Checks to see if the fetch request is complete before showing the event information */}
        <p>Title: {singleEvent? singleEvent.title: null}</p>
        <p>Description: {singleEvent? singleEvent.description: null}</p>
        <p>Location: {singleEvent? singleEvent.location: null}</p>
        <p>Date: {singleEvent? singleEvent.date: null}</p>
        <p>Tags:</p>
        <button>Like/Fav</button>
        {/* Button that toggles the createACommentForm boolean state */}
      <button
      onClick={() => SetCreateACommentForm(!createACommentForm)}
      >Comment</button>
        <button>I Want to Attend</button>
        <hr />
      </div>
      <button onClick={deleteOneEvent}>Delete Event</button>
      <button onClick={updateOneEvent}>Update Event</button>
      
      {/* If the createACommentForm is true to Comment form will appear and pass down the id of the event. */}
      {createACommentForm && <CreateCommentForm 
      commentsToShow={commentsToShow}
      id={id}/>}
      {/* This will be where the comments will be generated. The whole event information is passed down */}
      <Comments
        commentArray={commentArray}
        commentsToShow={commentsToShow}
        eventId = {id}
      />
    </div>
  )
}