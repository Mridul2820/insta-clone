import { useState, useEffect, useContext } from 'react'
import userContext from '../context/user'
import { getUserByUserId, getPhotos } from '../services/firebase'

const usePhotos = () => {
    const [photos, setPhotos] = useState(null)

    const {
        user: { uid: userId = '' }
    } = useContext(userContext)

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId)

            let followedUserPhotos = []

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following)
            }

            // re-arrange array to be newest photos first by dateCreated
            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos()
    }, [userId])

    return {photos}
}

export default usePhotos
