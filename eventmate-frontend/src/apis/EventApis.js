// Get all the events (INDEX)

export const getAllEvents = () => {
  return fetch('http://localhost:5002/api/events')
}

// Get one event (SHOW)

export const getOneEvent = (id) => {
  return fetch(`http://localhost:5002/api/events/${id}`)
}

// Create one event (CREATE) 
// Update/Edit one event (UPDATE)
// Delete one event (DESTROY)

