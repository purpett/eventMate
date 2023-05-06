import { useState, useEffect } from 'react'
import { getOneEvent } from '../apis/EventApis';

export default function UserEvent(props) {

    const {event, index} = props;
    console.log(event)

    const [userEventsList, setUserEventsList] = useState([])

    useEffect(() => {
        getOneEvent(event)
        .then(newEvent => newEvent.json())
        .then(data => setUserEventsList(...userEventsList, data))
        console.log(userEventsList)
    }, [])


        return(
            <>
            <p>Event title: {userEventsList.event.title}</p>
            <p>Date: {userEventsList.event.date}</p>
            <p>Event location: {userEventsList.event.location}</p>
            </>
        )
    }
    