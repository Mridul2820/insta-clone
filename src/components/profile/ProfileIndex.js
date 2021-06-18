import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { getUserPhotosByUsername } from '../../services/firebase'
import Photos from './Photos'

const ProfileIndex = ({ user }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const getProfileInfoAndPhotos = async() => {
            const photos = await getUserPhotosByUsername(user.username)

            console.log('photos', photos);

            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length })
        }

        getProfileInfoAndPhotos()
    }, [user.username])

    return (
        <div>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection}/>
            hello {user.username}
        </div>
    )
}

export default ProfileIndex

ProfileIndex.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string
    })
};


// https://youtu.be/AKeaaa8yAAk?t=30721