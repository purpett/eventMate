import { getAllEvents } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import CreateEventPage from "./CreateEventPage"
import { useState, useEffect } from "react"
import SingleEventCard from "./SingleEventCard"

export default function AllEventsPage() {
  const [everyEvent, setEveryEvent] = useState([])
  useEffect(() => {
    getAllEvents()
      .then(events => events.json())
      .then((data => {
        setEveryEvent([...data.events])
        // console.log(data.events)
      }))
      .catch((error) => error.message)
  }, [])

  function giveMeOneEvent() {
    getOneEvent("64540e928db8b54dad9367d4")
      .then((event) => event.json())
      .then((data => console.log(data)))
  }
  // everyEvent.map((eventInfo) => {
  //   return (<EventPage eventInfo={eventInfo} key={eventInfo._id} />)
  // })
  return (
    <div>
      <button onClick={(giveMeOneEvent)}>One event</button>
      <CreateEventPage />
      
      { 
      everyEvent.length ? 
        everyEvent.map((eventInfo, index) => {
          console.log(eventInfo)
        return(
        <SingleEventCard  
        eventInfo={eventInfo} 
        key={index}
        />)
      }) : null
      }
    </div>
  )
}