import { Link } from 'react-router-dom'
import { deleteEvent } from '../apis/EventApis'

export default function SingleEventCard({ eventInfo }) {
  return(
    <div>
      {/* Displays the information passed down from AllEventsPage. */}
      <Link to={`${eventInfo._id}`}>
        <div>
          <p>Title: {eventInfo.title}</p>
          <p>Location: {eventInfo.location}</p>
          <p>Date: {eventInfo.date}</p>
        </div>
      </Link>
      {/* Purely for testing purposes */}
      <button
      onClick={() => {
        deleteEvent(eventInfo._id)
      }}
      >Delete</button>
    </div>
  )
}