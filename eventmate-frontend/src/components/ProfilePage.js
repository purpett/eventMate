
import { useState, useEffect } from 'react'
import { getUser, createUser, deleteUser } from '../apis/UserApis'
import UserEvent from './UserEvent'

export default function ProfilePage() {

    const [userEvents, setUserEvents] = useState([])
    const [currentUser, setCurrentUser] = useState("")

    // Get token from localStorage
    function loadToken() {
        return localStorage.getItem('tokenContent')
    }

    // Get the payload by decoding token and decrypting

    function getPayloadFromToken() {
        const loadedToken = loadToken()
        if (!loadedToken) {
            return false
        }
        const encryptedPayload = loadedToken.split('.')
        return JSON.parse(window.atob(encryptedPayload[1]))
    }

    // Load the getUser api specific to the user id on page load
    useEffect(() => {
        const payload = getPayloadFromToken()
        getUser(payload.userId)
            .then(user => user.json())
            .then((data) => {
                setUserEvents(data.user.attending);
                setCurrentUser(data.user.username)
            })

    }, [])


    // Function to call the deleteUser api
    function deleteUserProfile() {
        deleteUser('6454d6ac11419d1077ddf1a6')
            .then(deletedUser => deletedUser.json())
            .then(data => console.log(data))
    }

    //add functionality to show upcoming and past events

    return (
        <>
            <h1>Profile</h1>
            <div>
                {currentUser}
                <button>Edit profile</button>
            </div>

            <button onClick={deleteUserProfile}>Delete account</button>

            {userEvents.length ? userEvents.map((event) => {
                return <UserEvent event={event} key={event._id} />
            }
            ) : null}

        </>

    )
}