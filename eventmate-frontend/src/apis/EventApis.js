// Get all the events (INDEX)

export const getAllEvents = () => {
  return fetch('http://localhost:5002/api/events')
}

// Get one event (SHOW)

export const getOneEvent = (id) => {
  return fetch(`http://localhost:5002/api/events/${id}`)
}

// Create one event (CREATE) 

export const createEvent = (newEvent) => {
  return fetch('http://localhost:5002/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  })
}

// Update/Edit one event (UPDATE)
export const updateEvent = (id, updatedEvent) => {
  return fetch(`http://localhost:5002/api/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEvent)
  })
}

// Delete one event (DESTROY)
export const deleteEvent = (id) => {
  return fetch(`http://localhost:5002/api/events/${id}`, {
    method: 'DELETE'
  })
}

