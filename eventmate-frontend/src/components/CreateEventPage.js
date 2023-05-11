import React from "react";
import { createEvent } from "../apis/EventApis";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { loadToken, getPayloadFromToken } from "../tokenLogic/tokenLogic";

export default function CreateEventPage() {
  const tokenFromLocalStorage = loadToken();
  const payloadFromToken = getPayloadFromToken(tokenFromLocalStorage)
  const username = payloadFromToken.username

  //create a state to hold the values from the input fields
  const [createdEvent, setCreatedEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    comments: [],
    attendees: [],
    organiser: username
  })
  const navigate = useNavigate()

  // function to call the post create event api with the new state which has just been set 
  function createOneEvent() {
    createEvent(createdEvent)
      .then((event) => event.json())
      .then((data => navigate(`../${data.event._id}`)))
      .catch((error) => console.log(error))
  }

  // function to get the values from the input fields and map those into the relevant state object fields
  function handleTextInput(e) {
    setCreatedEvent({ ...createdEvent, [e.target.name]: e.target.value });
  }

  return (
    <div className="create-event-page">
      <h1>CREATE A NEW EVENT</h1>
      <form className="create-event-form">
        <div className="create-event-form-input">
          <label>Title</label>
          <input
            name='title'
            value={createdEvent.title}
            onChange={handleTextInput}
            placeholder="Enter your Events Title"
          />
        </div>

        <div className="where-and-when">
          <div className="create-event-form-input">
            <label>Where</label>
            <input
              name='location'
              value={createdEvent.location}
              onChange={handleTextInput}
              placeholder="Location"
            />
          </div>
          <div className="create-event-form-input">
            <label>When</label>
            <input
              name='date'
              type="date"
              min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              onChange={handleTextInput}
              placeholder="Date"
              value={createdEvent.date}
            />
          </div>
        </div>
        <div className="create-event-form-input">
          <label>Description</label>
          <textarea name='description' 
          value={createdEvent.description}
          onChange={handleTextInput} 
          placeholder="Description" />
        </div>
        <button className="normal-btn" onClick={(e) => {
          e.preventDefault();
          createOneEvent()

        }}>Create event</button>
      </form>
    </div>
  )
}