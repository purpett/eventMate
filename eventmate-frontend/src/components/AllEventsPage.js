import { getAllEvents } from "../apis/EventApis"
import { useEffect } from "react"
import SingleEventCard from "./SingleEventCard"

export default function AllEventsPage(props) {

  useEffect(() => {
    // On load sends a fetch request to the backend to get every Event and then stores it into the state everyEvent
    getAllEvents()
      .then(events => events.json())
      .then((data => {
        const now = new Date();
        const onlyUpcomingEvents = data.events.filter((event) => new Date(event.date) >= now)
        props.setEveryEvent([...onlyUpcomingEvents])
      }))
      .catch((error) => error.message)
  }, [])

  return (
    <div className="homepage-container">
      <div className="homepage-card" >
        {// Checks to see if there is anything in everyEvent before it maps through it.
          props.everyEvent.length ?
            props.everyEvent.map((eventInfo, index) => {
              return (
                // Returns singleEventCard the same number of times as there is items in the array everyEvent and passes down the information for that individual event.
                <SingleEventCard
                  index={index}
                  eventInfo={eventInfo}
                  key={eventInfo._id}
                />)
            }) : null}
      </div>
    </div>
  )
}