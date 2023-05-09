import { useState } from "react"

export default function Login() {

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    function storeToken(token) {
        localStorage.setItem('tokenContent', JSON.stringify(token))
    }

    function createToken() {
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
            .then((response) => response.json())
            .then((token) => {
                storeToken(token)
            })
    }

    function handleTextInput(e) {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h2>Login</h2>
            <div className="sign-up-div">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createToken();
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