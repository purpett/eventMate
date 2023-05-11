import transformDate from '../transformDate'
import { Link } from 'react-router-dom'

export default function UserEvent(props) {
  const { event } = props;
  // Displays the users events on the page pretty straight forward.
  return (
    <div className='event-card' id="user-event">
      <Link to={`../${event._id}`}>
      <span className='event-title'>{event.title}</span></Link>
      |
      <span>{transformDate(event.date)}</span>
    </div>
  )
}
