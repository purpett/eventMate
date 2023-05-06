import { useState } from "react"
import { createUser } from "../apis/UserApis";

export default function SignUp(){
    
   const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    attending: []
   })
    

   function handleSignUpTextInput (e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
  }

  function createOneUser () {
    createUser(newUser)
    .then((user) => user.json())
    // .then((data => console.log(data)))
    .catch((error) => console.log(error))
    setNewUser({})
    

  }

   return (

        <div>
            <h2>Sign Up</h2>
            <form>
                <h3>Username</h3>
                <input name='username' onChange={handleSignUpTextInput} placeholder="Enter Your Username"></input>
                <h3>Password</h3>
                <input name='password' onChange={handleSignUpTextInput} placeholder="Enter Your Password"></input>
                <button onClick={(e) => {
                    e.preventDefault();
                    createOneUser()
                    }}>Sign Up</button>
            </form>
        </div>

    )
}