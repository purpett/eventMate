import { deleteEvent } from "../apis/EventApis"

export default function EventPage() {

  function deleteOneEvent() {
    deleteEvent("64550dc70e1425af1934b2f9")
      .then((deletedEvent) => deletedEvent.json())
      .then((data => console.log(data)))
  }

  return (
    <div>
      <button onClick={deleteOneEvent}>Delete One Event</button>
    </div>
  )
}