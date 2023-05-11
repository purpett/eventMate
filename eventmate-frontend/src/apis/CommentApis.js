// all of these have not been tested yet
import { apiUrl } from "./apiConfig"

// create one comment (CREATE)

export const createComment = (eventId, newComment) => {
  return fetch(`${apiUrl}/events/${eventId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: `${newComment.text}`,
      hideAuthor: `${newComment.hideAuthor}`,
      author: `${newComment.author}`
  })
  })
}

// delete one comment (DELETE)

export const deleteComment = (eventId, commentId) => {
  return fetch(`${apiUrl}/events/${eventId}/comments/${commentId}`, {
    method: 'DELETE'
  })
}

//update one comment (UPDATE)

export const updateComment = (eventId, commentId, updatedComment) => {
  return fetch(`${apiUrl}/events/${eventId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedComment)
  })
}