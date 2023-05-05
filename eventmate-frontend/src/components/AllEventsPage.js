import { getAllEvents } from "../apis/EventApis"
import { useState, useEffect } from "react"

export default function AllEventsPage() {
  console.log('blabla')
  useEffect(() => {
    getAllEvents()
      .then(events => events.json())
      .then((data => console.log(data)))
  }, [])

  return (
    <div>
      {/*  */}
    </div>
  )
}