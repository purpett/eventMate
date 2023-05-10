import { useState } from "react"
import { createUser, getUserByUsername } from "../apis/UserApis";
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
        console.log(data)
        if (data.user) {
            navigate(`/Login`)
        } else if (data.errors.username) {
            setIsError(true)
            setNewUser({username: "", password: ""})
        }
    })
    .catch((error) => console.log(error))
    setNewUser({})

  }


   return (
<>
    <h2>Sign Up</h2>

    <div className={ isError ? 'sign-up-error' : 'sign-up-error-false' }> 
        USername already exists
    </div>
        <div className="sign-up-div">
            
            <form>
                <h3>Username</h3>
                <input 
                    name='username'
                    value={newUser.username}
                    onChange={handleSignUpTextInput} 
                    placeholder="Enter Your Username"
                    required
                    autoComplete="off"
                ></input>
                <h3>Password</h3>
                <input 
                    name='password' 
                    value={newUser.password}
                    type='password'
                    onChange={handleSignUpTextInput} 
                    placeholder="Enter Your Password"
                    required
                    autoComplete="off"
                ></input>
                <button className="sign-up-button" onClick={(e) => {
                    e.preventDefault();
                    createOneUser()

                    }}>Sign Up</button>
            </form>
        </div>

</>
    )
}