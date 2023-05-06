export default function SingleEventCard({ eventInfo }) {
  return(
    <div>
      <p>Title: {eventInfo.title}</p>
      <p>Location: {eventInfo.location}</p>
      <p>Date: {eventInfo.date}</p>
    </div>
  )
}