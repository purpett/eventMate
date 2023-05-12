import { useState } from "react"
import { createUser } from "../apis/UserApis";
import { useNavigate } from "react-router-dom";


export default function SignUp() {

  const navigate = useNavigate()

  // create a state to hold the new user
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    attending: []
  })

  const [isError, setIsError] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  // function to set the username field in the state equal to the username input field
  //and the same for the password
  function handleSignUpTextInput(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  // call the createUser api with the newUser as an argument
  function createOneUser() {
    createUser(newUser)
      .then((user) => user.json())
      .then(data => {
        if (data.user) {
          navigate(`/Login`)
        } else if (data.errors.username) {
          setIsError(true)
          setNewUser({ username: "", password: "" })
        }
      })
      .catch((error) => console.log(error))
    setNewUser({})

  }


  return (
    <div className="auth-page">
      <h2>SIGN UP</h2>
      <div className="sign-up-div">
        <div className={isError ? 'error' : 'error-false'}>
          Username already exists
        </div>
        <form>
          <div className="auth-form-username-container">
            <label className="auth-username">Username</label>
            <input
              name='username'
              value={newUser.username}
              onChange={handleSignUpTextInput}
              placeholder="Enter Your Username"
              required
              autoComplete="off"
            />
          </div>
          <div className="auth-form-password-container">
            <div className="auth-password">Password</div>
            <div className="password-area">
              <input
                name='password'
                value={newUser.password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleSignUpTextInput}
                placeholder="Enter Your Password"
                required
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '😱' : '😎'}
              </button>
            </div>
          </div>
          <button className="normal-btn auth-btn" onClick={(e) => {
            e.preventDefault();
            createOneUser()
          }}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}