import { useState } from "react"
import { createToken } from "../tokenLogic/tokenLogic";

export default function Login() {

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    function handleTextInput(e) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h2>Login</h2>
            <div className="sign-up-div">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createToken(userCredentials);
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