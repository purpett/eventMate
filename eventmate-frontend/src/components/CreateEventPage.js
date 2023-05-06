import React from "react";
import { createEvent } from "../apis/EventApis";
import { useState } from "react"

export default function CreateEventPage() {
  const [createdEvent, setCreatedEvent] = useState({
  title: "",
  description: "",
  location: "",
  date: "",
  // organiser: "Miles",
  comments: [],
  attendees: []

  })
  
  function createOneEvent() {
    createEvent(createdEvent)
      .then((event) => event.json())
      .then((data => console.log(data)))

      console.log(createdEvent)
  }

  function handleTextInput (e) {
    setCreatedEvent({ ...createdEvent, [e.target.name]: e.target.value });
    console.log(createdEvent);
  }

  return (
    <div>
      <form>
        <input name='title' onChange={handleTextInput} placeholder="Enter your Events Title"></input>
        <input name='location' onChange={handleTextInput} placeholder="Location"></input>
        <input name='date' onChange={handleTextInput} placeholder="Date"></input>
        <input name='description' onChange={handleTextInput} placeholder="Description"></input>



        <button onClick={(e) => {
          e.preventDefault();
          createOneEvent()
          }}>Create event</button>
      </form>
    </div>
  )
}