import { loadToken } from "../tokenLogic/tokenLogic"

// Get a single User
export const getUser = (id) => {
  const token = JSON.parse(loadToken())
  return fetch(`http://localhost:5002/api/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

// Check if a user exists
export const getUserByUsername = (username) => {
  return fetch(`http://localhost:5002/api/users/test/${username}`)

}

// Create single User
export const createUser = (userInfo) => {
  return fetch(`http://localhost:5002/api/users`, {
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
  return fetch(`http://localhost:5002/api/users/${id}`, {
    method: 'DELETE'
  }
  )
}

// Update single User
export const updateUser = (id, userChanges, userInfo) => {
  // console.log(userInfo.attending)
  console.log(userChanges.attending)
  return fetch(`http://localhost:5002/api/users/${id}`, {
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
  }
  )
}

// Find all events that include a given user id
export const getAllEventsWithUserId = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}/events`)
}
