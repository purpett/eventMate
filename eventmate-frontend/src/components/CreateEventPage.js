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

  // function handleFormSubmission

  return (
    <div>
      <form>
        <input name='event-title' placeholder="Enter your Events Title"></input>
        <input name='location' placeholder="Location"></input>
        <input name='date' placeholder="Date"></input>
        <input name='description' placeholder="Description"></input>



        <button onClick={createOneEvent}>Create event</button>
      </form>
    </div>
  )
}