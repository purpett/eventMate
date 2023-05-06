import { useState, useEffect } from 'react'
import { getUser, createUser, deleteUser } from '../apis/UserApis'
import UserEvent from './UserEvent'

export default function ProfilePage() {

const [userData, setUserData] = useState()

// Load the getUser api specific to the user id on page load
    useEffect(() => {
        getUser('64562aa36d099656d51f46ec')
        .then(user => user.json())
        .then((data => setUserData(data)))

    }, [])

// Function to call the deleteUser api
    function deleteUserProfile(){
        deleteUser('64562aa36d099656d51f46ec')
        .then(deletedUser => deletedUser.json())
        .then(data => console.log(data))
    }

// Create user
    // const testUser = {
    //     username: 'test user',
    //     password: 'password',
    //     attending: ['party', 'concert']
    // }

    // function createUserProfile(){
    //     createUser()
    //     .then(newUser => newUser.json())
    //     .then(data => console.log(data))
    // }

    return(
        <>
        <div>
            <button>Edit profile</button>
        </div>
        <button onClick={ createUserProfile }>Create account</button>

        <button onClick={ deleteUserProfile }>Delete account</button>

        {userData.attending.map((user, index) => {
            return (<UserEvent />)
        }
        )}
        
        </>

    )
}