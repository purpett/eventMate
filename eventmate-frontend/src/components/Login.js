import { useState } from "react"
import { createToken } from "../tokenLogic/tokenLogic";
import { useNavigate } from "react-router-dom";
import { loadToken, getPayloadFromToken } from "../tokenLogic/tokenLogic";

export default function Login() {

    const navigate = useNavigate()

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    const[isError, setIsError] = useState(false);

    function handleTextInput(e) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    function isUserAuthenticated () {
       const token = loadToken();
       const payloadFromToken = getPayloadFromToken(token)
       const username = payloadFromToken.username

       if (userCredentials.username === username){
        navigate('/')
        
       } else {
        setIsError(true);
       }

    }

    return (
        <>
            <h2>Login</h2>
            <div className={isError ? "error-message" : "error-message-false"}>
                <h3>Please Enter Valid Credentials</h3>
            </div>
            <div className="sign-up-div">

                <form onSubmit={(e) => {
                    e.preventDefault();
                    createToken(userCredentials);
                    isUserAuthenticated()
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
                        type='password'
                        placeholder="Enter Your Password"
                        required
                        autoComplete="off"
                        value={userCredentials.password}
                        onChange={handleTextInput}
                    />
                    <button className="sign-up-button" type="submit">Login</button>
                </form>
            </div>
        </>

    )
}