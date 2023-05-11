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

    const[showPassword, setShowPassword] = useState(false)

    function handleTextInput(e) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    function isUserAuthenticated (e) {
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
        <>
            <h2>Login</h2>
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