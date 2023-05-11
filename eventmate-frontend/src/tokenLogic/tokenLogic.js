function storeToken(token) {
  localStorage.setItem('tokenContent', JSON.stringify(token))
}

// Get token from localStorage
function loadToken() {
  return localStorage.getItem('tokenContent')
}

function removeToken() {
  return localStorage.removeItem('tokenContent')
}

function createToken(userCredentials) {
  return fetch('http://localhost:5002/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${userCredentials.username}`,
      password: `${userCredentials.password}`,
    })
  })
}

// Get the payload by decoding token and decrypting

function getPayloadFromToken() {
  const loadedToken = loadToken()
  if (!loadedToken) {
    return false
  }
  const encryptedPayload = loadedToken.split('.')
  return JSON.parse(window.atob(encryptedPayload[1]))
}

function tokenExp() {
  const payload = getPayloadFromToken()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

function isOrganiser(organiser) {
  const user = getPayloadFromToken().username
  if (organiser === user) return true
  else return false
}

module.exports = { loadToken, createToken, getPayloadFromToken, removeToken, isOrganiser, storeToken, tokenExp }