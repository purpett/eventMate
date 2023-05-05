// Get a single User
export const GetUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
}

// Create single User
export const CreateUser = (userInfo) => {
  return fetch(`http://localhost:5002/api/users/`, {
    method: 'POST',
    header: {
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
export const DeleteUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
}

// Update single User
export const UpdateUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
}
