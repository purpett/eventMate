import { getAllEvents } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"


import CreateEventPage from "./CreateEventPage"
import ProfilePage from "./ProfilePage"


import { useState, useEffect } from "react"
import SingleEventCard from "./SingleEventCard"

export default function AllEventsPage() {
  const [everyEvent, setEveryEvent] = useState([])
  useEffect(() => {
    // On load sends a fetch request to the backend to get every Event and then stores it into the state everyEvent
    getAllEvents()
      .then(events => events.json())
      .then((data => {
        setEveryEvent([...data.events])
      }))
      .catch((error) => error.message)
  }, [])

  function giveMeOneEvent() {
    getOneEvent("64540e928db8b54dad9367d4")
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  return (
    <div>
      <button onClick={(giveMeOneEvent)}>One event</button>

   


      { 
      // Checks to see if there is anything in everyEvent before it maps through it.
      everyEvent.length ? 
        everyEvent.map((eventInfo) => {
        return(
          // Returns singleEventCard the same number of times as there is items in the array everyEvent and passes down the information for that individual event.
        <SingleEventCard  
        eventInfo={eventInfo} 
        key={eventInfo._id}
        />)
      }) : null
      }

    </div>
  )
}