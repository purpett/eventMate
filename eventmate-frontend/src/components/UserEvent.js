import { useState, useEffect } from 'react'
import { getOneEvent } from '../apis/EventApis';

export default function UserEvent(props) {

    const {event, index} = props;
    

    const [userEventsList, setUserEventsList] = useState(event)


        return(
            <>
            <hr/>
            <p>Event title: {userEventsList.title}</p>
            <p>Date: {userEventsList.date}</p>
            <p>Event location: {userEventsList.location}</p>
            </>
        )
    }
