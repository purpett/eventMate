import { deleteEvent, updateEvent } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import Comments from "./Comments"
import CreateCommentForm from "./CreateCommentForm"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function EventPage() {
  const [singleEvent, setSingleEvent] = useState([])
  const [createAComment, SetCreateAComment] = useState(false)
  const { id } = useParams()

  const giveOneEvent = (id) => {
    getOneEvent(id)
      .then((event) => event.json())
      .then((data => setSingleEvent(data.event)))
      .catch((error) => console.log(error.message))
  }

  useEffect(() => {
    giveOneEvent(id)
  }, [])

  const updatedEvent = {
    title: 'Another event'
  }

  function deleteOneEvent() {
    deleteEvent(id)
      .then((deletedEvent) => deletedEvent.json())
      .then((data => console.log(data)))
  }

  function updateOneEvent() {
    updateEvent(id, updatedEvent)
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  return (
    <div>
      <div>
        <p>Title: {singleEvent? singleEvent.title: null}</p>
        <p>Description: {singleEvent? singleEvent.description: null}</p>
        <p>Location: {singleEvent? singleEvent.location: null}</p>
        <p>Date: {singleEvent? singleEvent.date: null}</p>
        <p>Tags:</p>
        <button>Like/Fav</button>
        <button>Comment</button>
        <button>I Want to Attend</button>
        <hr />
      </div>
      <button onClick={deleteOneEvent}>Delete Event</button>
      <button onClick={updateOneEvent}>Update Event</button>
      <button
      onClick={() => SetCreateAComment(!createAComment)}
      >Add Comment</button>
      {createAComment && <CreateCommentForm id={id}/>}
      <Comments/>
    </div>
  )
}