import { getAllEvents } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"


import CreateEventPage from "./CreateEventPage"
import ProfilePage from "./ProfilePage"


import {  useEffect } from "react"
import SingleEventCard from "./SingleEventCard"

export default function AllEventsPage(props) {
  
  useEffect(() => {
    // On load sends a fetch request to the backend to get every Event and then stores it into the state everyEvent
    getAllEvents()
      .then(events => events.json())
      .then((data => {
        props.setEveryEvent([...data.events])
      }))
      .catch((error) => error.message)
  }, [])

  return (
    <div>

      { 
      // Checks to see if there is anything in everyEvent before it maps through it.
      props.everyEvent.length ? 
        props.everyEvent.map((eventInfo) => {
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