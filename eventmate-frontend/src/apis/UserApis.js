// Get a single User
export const GetUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
}

// Create single User
export const CreateUser = () => {
  return fetch(`http://localhost:5002/api/users/`)
}

// Delete single User
export const DeleteUser = (id) => {
  return fetch(`http://localhost:5002/api/users/${id}`)
}
