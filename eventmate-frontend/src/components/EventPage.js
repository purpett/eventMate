import { deleteEvent } from "../apis/EventApis"
import { updateEvent } from "../apis/EventApis"

export default function EventPage() {
  const updatedEvent = {
    title: 'Another event'
  }

  function deleteOneEvent() {
    deleteEvent("64550dc70e1425af1934b2f9")
      .then((deletedEvent) => deletedEvent.json())
      .then((data => console.log(data)))
  }

  function updateOneEvent() {
    updateEvent("645512ae0e1425af1934b35e", updatedEvent)
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  return (
    <div>
      <button onClick={deleteOneEvent}>Delete One Event</button>
      <button onClick={updateOneEvent}>Update One Event</button>
    </div>
  )
}