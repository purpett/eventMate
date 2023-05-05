import { createEvent } from "../apis/EventApis";

export default function CreateEventPage() {
  const event = {
    title: 'An event',
    description: 'bkbbasbfjk',
    location: 'London',
    date: '2023-07-01',
    comments: [],
    attendees: []
  }

  function createOneEvent() {
    createEvent(event)
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  return (
    <div>

      <button onClick={createOneEvent}>Create event</button>
    </div>
  )
}