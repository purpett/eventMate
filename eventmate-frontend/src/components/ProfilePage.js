import { useState, useEffect } from 'react'
import { getUser, createUser, deleteUser } from '../apis/UserApis'
import UserEvent from './UserEvent'

export default function ProfilePage() {

const [userEvents, setUserEvents] = useState([])

// Load the getUser api specific to the user id on page load
    useEffect(() => {
        getUser('6454c384f5c2e5818741f897')
        .then(user => user.json())
        .then(data => setUserEvents(data.user.attending))
        console.log(userEvents)

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
            <button>Edit profile</button>
        </div>

        <button onClick={ deleteUserProfile }>Delete account</button>

        {userEvents.length ? userEvents.map((event, index) => {
            return <UserEvent event={event} index = {index} />
        }
        ) : null}
        
        </>

    )
}
