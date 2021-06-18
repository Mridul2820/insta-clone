import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getUserByUserName } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/Header'
import ProfileIndex from '../components/profile/ProfileIndex'

const Profile = () => {
    const { username } = useParams()
    const history = useHistory()
    const [user, setUser] = useState(null)


    useEffect(() => {
        const checkUserExists = async() => {
            const user = await getUserByUserName(username)

            if(user.length > 0) {
                setUser(user[0])
            }
            else {
                history.push(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists()
    }, [history, username])

    return user?.username ? (
        <div>
            <Header />
            <ProfileIndex user={user} />
        </div>
    ) : null
}

export default Profile
