import { Link } from 'react-router-dom'
import transformDate from "../transformDate"

export default function SingleEventCard({ eventInfo, index }) {
  return (

    <div className={index === 0 ? "first-card" : "all-other-cards"}>
      {/* Displays the information passed down from AllEventsPage. */}
      <Link to={`${eventInfo._id}`}>
        <div className="event-card">
          <p>Title: {eventInfo.title}</p>
          <p>Location: {eventInfo.location}</p>
          <p>Date: {transformDate(eventInfo.date)}</p>
        </div>
      </Link>
      {/* Purely for testing purposes */}
    </div>
  )
}