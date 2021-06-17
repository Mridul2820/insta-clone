import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getUserByUserName } from '../services/firebase'
import * as ROUTES from '../constants/routes'

const Profile = () => {
    const { username } = useParams()
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [userExists, setUserExists] = useState(undefined)


    useEffect(() => {
        const checkUserExists = async() => {
            const user = await getUserByUserName(username)

            if(user.length > 0) {
                setUser(user[0])
                setUserExists(true)
            }
            else {
                history.push(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists()
        console.log('user', user);
    }, [history, username])

    return userExists ? (
        <div>profile of {user.fullName}</div>
    ) : null
}

export default Profile
