import { useState } from "react"
import { createToken, storeToken, loadToken, getPayloadFromToken } from "../tokenLogic/tokenLogic";
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function Login() {

  const navigate = useNavigate()

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  })


  const [isError, setIsError] = useState(false);

  function handleTextInput(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function isUserAuthenticated(e) {
    e.preventDefault()
    createToken(userCredentials)
      .then((response) => response.json())
      .then((token) => {
        storeToken(token.token)
      })
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div className="auth-page">
      <h2>LOGIN</h2>
      <div className={isError ? "error-message" : "error-message-false"}>
        Please Enter Valid Credentials
      </div>
      <div className="sign-up-div">
        <form onSubmit={(e) => { isUserAuthenticated(e) }}>
          <div className="auth-form-username-container">
            <label className="auth-username">Username</label>
            <input
              name='username'
              placeholder="Enter Your Username"
              required
              autoComplete="off"
              value={userCredentials.username}
              onChange={handleTextInput}
            />
          </div>
          <div className="auth-form-password-container">
            <label className="auth-password">Password</label>
            <input
              name='password'
              type='password'
              placeholder="Enter Your Password"
              required
              autoComplete="off"
              value={userCredentials.password}
              onChange={handleTextInput}
            />
          </div>
          <button className="normal-btn auth-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}