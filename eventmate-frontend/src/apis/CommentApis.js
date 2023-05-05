// all of these have not been tested yet

// create one comment (CREATE)

export const createComment = (eventId, newComment) => {
  return fetch(`http://localhost:5002/api/events/${eventId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  })
}

// delete one comment (DELETE)

export const deleteComment = (eventId, commentId) => {
  return fetch(`http://localhost:5002/api/events/${eventId}/comments/${commentId}`, {
    method: 'DELETE'
  })
}

//update one comment (UPDATE)

export const updateComment = (eventId, commentId, updatedComment) => {
  return fetch(`http://localhost:5002/api/events/${eventId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedComment)
  })
}