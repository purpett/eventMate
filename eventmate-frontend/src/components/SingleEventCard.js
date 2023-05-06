export default function SingleEventCard({ eventInfo }) {
  return(
    <div>
      {/* Displays the information passed down from AllEventsPage. */}
      <p>Title: {eventInfo.title}</p>
      <p>Location: {eventInfo.location}</p>
      <p>Date: {eventInfo.date}</p>
    </div>
  )
}