import { loadToken } from "../tokenLogic/tokenLogic"
import { apiUrl } from './apiConfig'

// Get a single User
export const getUser = (id) => {
  const token = JSON.parse(loadToken())
  return fetch(`${apiUrl}/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

// Create single User
export const createUser = (userInfo) => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      username: `${userInfo.username}`,
      password: `${userInfo.password}`,
      attending: []
    })
  })
}

// Delete single User
export const deleteUser = (id) => {
  return fetch(`${apiUrl}/users/${id}`, {
    method: 'DELETE'
  })
}

// Update single User
export const updateUser = (id, userChanges, userInfo) => {
  return fetch(`${apiUrl}/users/${id}`, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: `${userChanges.username ? userChanges.username : userInfo.username}`,
      password: `${userChanges.password ? userChanges.password : userInfo.password}`,
      attending: [...userInfo.attending, userChanges.attending]
    })
  })
}

// Find all events that include a given user id
export const getAllEventsWithUserId = (id) => {
  return fetch(`${apiUrl}/users/${id}/events`)
}
