import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { getUserPhotosByUsername } from '../../services/firebase'
import Photos from './Photos'
import styled from 'styled-components'

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
        <Container>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection}/>
        </Container>
    )
}

const Container = styled.div`
    padding: 30px 20px 0;
`

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
