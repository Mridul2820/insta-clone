import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

const SuggestedProfile = ({
    profileDocId,
    username,
    profileId,
    userId,
    loggedInUserDocId
}) => {
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true)

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId)
        await updateFollowedUserFollowers(profileDocId, userId)
    }

    return (
        <div>
            {!followed ? (
                <Profile>
                    <ProfileLink to={`/p/${username}`}>
                        <img 
                            src={`/images/avatars/${username}.png`}
                            alt={`${username} profile`}
                        />
                        <h4>{username}</h4>
                    </ProfileLink>
                    <FollowBtn onClick={handleFollowUser} >
                        Follow
                    </FollowBtn>
                </Profile>
            ) : null}
        </div>
    )
}

const Profile = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ProfileLink = styled(Link)`
    display: flex;
    align-items: center;

    img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        margin-right: 15px;
    }

    h4 {
        font-weight: 600;
        font-size: 14px;
    }
`

const FollowBtn = styled.button`
    color: #0095f6;
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
    font-weight: 600;
`

export default SuggestedProfile

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
};