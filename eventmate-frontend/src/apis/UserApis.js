// Get a single User
export const getUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
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
  console.log(userInfo.attending)
  console.log(userChanges.attending)
  return fetch(`http://localhost:5002/api/users/${id}`, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: `${userChanges.username? userChanges.username: userInfo.username}`,
      password: `${userChanges.password? userChanges.password: userInfo.password}`,
      attending: [...userInfo.attending, userChanges.attending]
    })
  }
  )
}
