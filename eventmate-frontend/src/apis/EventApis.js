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
// Delete one event (DESTROY)

