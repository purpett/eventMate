import { Link } from 'react-router-dom'
import transformDate from "../transformDate"

export default function SingleEventCard({ eventInfo, index }) {
  return (

    <div className={index === 0 ? "first-card" : "all-other-cards"}>
      {/* Displays the information passed down from AllEventsPage. */}
      <Link to={`${eventInfo._id}`}>
        <div className="event-card">
          {index === 0 && <div class="popular-event-banner">POPULAR EVENT</div>}
          <div className="card-details">
            <div>
              <p className='title'>{eventInfo.title}</p>
              <div className='where'>
                <img src="/media/map-marker-radius.svg" alt="map marker icon" />
                {eventInfo.location}
              </div>
              {/* Transforms the date into a more appealing format */}
              <div className='when'>
                <img src="/media/calendar-month-outline.svg" alt="calendar icon" />
                {transformDate(eventInfo.date)}
              </div>
            </div>
            {/* First event card will have additional info displayed on it */}
            {index === 0 && (
              <div className='most-attended'>
                {eventInfo.attendees.length === 0 ? "No one is going to this event" : (
                  `${eventInfo.attendees.length} ${eventInfo.attendees.length === 1 ? 'person is' : 'people are'} going to this event!`
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
      {/* Purely for testing purposes */}
    </div>
  )
}