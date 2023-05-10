import transformDate from '../transformDate'

export default function UserEvent(props) {
  const { event } = props;

  return (
    <>
      <hr />
      <p>Event title: {event.title}</p>
      <p>Date: {transformDate(event.date)}</p>
      <p>Event location: {event.location}</p>
    </>
  )
}
