
import { useState, useEffect } from 'react'
import { getUser, createUser, deleteUser } from '../apis/UserApis'
import UserEvent from './UserEvent'

export default function ProfilePage() {

const [userEvents, setUserEvents] = useState([])
const [currentUser, setCurrentUser] = useState("")

// Load the getUser api specific to the user id on page load
    useEffect(() => {
        getUser('64577ed65683384e242cb228')
        .then(user => user.json())
        .then((data) => {
            setUserEvents(data.user.attending); 
            setCurrentUser(data.user.username)})
        
    }, [])


// Function to call the deleteUser api
    function deleteUserProfile(){
        deleteUser('64566df14521ec5fa483a68e')
        .then(deletedUser => deletedUser.json())
        .then(data => console.log(data))
    }

    return(
        <>
        <div>
            {currentUser}
            <button>Edit profile</button>
        </div>

        <button onClick={ deleteUserProfile }>Delete account</button>

        {userEvents.length ? userEvents.map((event, index) => {
          console.log(event)
            // return <UserEvent event={event} index = {index} />
        }
        ) : null}

        </>

    )
}