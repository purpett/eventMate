import { useState, useEffect } from 'react'
import { getOneEvent } from '../apis/EventApis';

export default function UserEvent(props) {

  const { event, index } = props;


  return (
    <>
      <hr />
      <p>Event title: {event.title}</p>
      <p>Date: {event.date}</p>
      <p>Event location: {event.location}</p>
    </>
  )
}
