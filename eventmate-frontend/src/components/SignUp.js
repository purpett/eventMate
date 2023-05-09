import { useState } from "react"
import { createUser } from "../apis/UserApis";
import { useNavigate } from "react-router-dom";


export default function SignUp() {

    // create a state to hold the new user
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        attending: []
    })

    // function to set the username field in the state equal to the username input field
    //and the same for the password
    function handleSignUpTextInput(e) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

  // call the createUset api with the newUser as an argument
  function createOneUser () {
    createUser(newUser)
    .then((user) => user.json())
    // .then((data => console.log(data)))
    .catch((error) => console.log(error))
    setNewUser({})
    

  }



   return (
<>
    <h2>Sign Up</h2>
        <div className="sign-up-div">
            
            <form>
                <h3>Username</h3>
                <input 
                    name='username' 
                    onChange={handleSignUpTextInput} 
                    placeholder="Enter Your Username"
                    required
                    autoComplete="off"
                ></input>
                <h3>Password</h3>
                <input 
                    name='password' 
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