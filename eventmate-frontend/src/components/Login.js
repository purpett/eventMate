import { useState } from "react"
import { createToken, storeToken } from "../tokenLogic/tokenLogic";
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function Login() {

  const navigate = useNavigate()

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  })

  // State to trigger invalid username message to appear
  const [isError, setIsError] = useState(false);

  // State to toggle whether or not the user wants the password visable
  const[showPassword, setShowPassword] = useState(false)

  // Function to dynamically handle the changes to the username input field and the password input field
  function handleTextInput(e) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

  function isUserAuthenticated (e) {
    //Stops page refreshing
      e.preventDefault()
      // Creates a token takes the userCredentials as a parameter so it can be used in the backend to confirm the user has an account
      createToken(userCredentials)
      // Converts to Json
        .then((response) => response.json())
        .then((token) => {
          // Stores just the token in local storage
          storeToken(token.token)
          // If the token is created successfully navigate the user to the homepage else change the state isError which will bring up a message on the screen
          if(token.success) navigate('/')
          else setIsError(true)
        })
    }

    return (
        <>
            <h2>Login</h2>
            {/* Turnary on the invalid username or password message making it display when the user logs in incorrectly. */}
            <div className={isError ? "error-message" : "error-message-false"}>
                <h3>Please Enter Valid Credentials</h3>
            </div>
            <div className="sign-up-div">
                <form onSubmit={(e) => {
                    isUserAuthenticated(e)
                }}>
                    <h3>Username</h3>
                    <input
                        name='username'
                        placeholder="Enter Your Username"
                        required
                        autoComplete="off"
                        value={userCredentials.username}
                        onChange={handleTextInput}
                    />
                    <h3>Password</h3>
                    <input
                        name='password'
                        type={showPassword? 'text': 'password'}
                        placeholder="Enter Your Password"
                        required
                        autoComplete="off"
                        value={userCredentials.password}
                        onChange={handleTextInput}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword? '😱' : '😎'}
                    </button>
                    <button className="sign-up-button" type="submit">Login</button>
                </form>
            </div>
        </>
    )
  }