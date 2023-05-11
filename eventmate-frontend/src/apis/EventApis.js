import { apiUrl } from './apiConfig'


// Get all the events (INDEX)

export const getAllEvents = () => {
  return fetch(`${apiUrl}/events`)
}

// Get one event (SHOW)

export const getOneEvent = (id) => {
  return fetch(`${apiUrl}/events/${id}`)
}

// Create one event (CREATE) 

export const createEvent = (newEvent) => {
  return fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  })
}

// Update/Edit one event (UPDATE)
export const updateEvent = (id, updatedEvent) => {
  return fetch(`${apiUrl}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEvent)
  })
}

// Delete one event (DESTROY)
export const deleteEvent = (id) => {
  return fetch(`${apiUrl}/events/${id}`, {
    method: 'DELETE'
  })
}

