import { useState } from "react"


export default function Login(){
   
   return (
<>
    <h2>Login</h2>
        <div className="sign-up-div">
            <form>
                <h3>Username</h3>
                <input name='username'  placeholder="Enter Your Username"></input>
                <h3>Password</h3>
                <input name='password' placeholder="Enter Your Password"></input>
                <button className="sign-up-button" onClick={(e) => {
                    e.preventDefault();
                    
                    }}>Login</button>
            </form>
        </div>
</>

    )
}