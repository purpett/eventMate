import { getAllEvents } from "../apis/EventApis"
import { getOneEvent } from "../apis/EventApis"
import CreateEventPage from "./CreateEventPage"
import { useState, useEffect } from "react"

export default function AllEventsPage() {
  useEffect(() => {
    getAllEvents()
      .then(events => events.json())
      .then((data => console.log(data)))
  }, [])

  function giveMeOneEvent() {
    getOneEvent("64540e928db8b54dad9367d4")
      .then((event) => event.json())
      .then((data => console.log(data)))
  }

  return (
    <div>
      <button onClick={(giveMeOneEvent)}>One event</button>
      <CreateEventPage />
    </div>
  )
}