import transformDate from '../transformDate'

export default function UserEvent(props) {
  const { event } = props;
  // Displays the users events on the page pretty straight forward stuff
  return (
    <div className='event-card' id="user-event">
      <span className='event-title'>{event.title}</span>
      |
      <span>{transformDate(event.date)}</span>
    </div>
  )
}
