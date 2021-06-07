import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const SuggestedProfile = ({
    userDocId,
    username,
    profileId,
    userId
}) => {
    const [followed, setFollowed] = useState(false)



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
                    <FollowBtn
                        onClick={() => console.log('follow this user')}
                    >
                        Follow
                    </FollowBtn>
                </Profile>
            ) : null}
        </div>
    )
}

const Profile = styled.div`
    margin-top: 20px;
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
        font-size: 14px;
    }
`

const FollowBtn = styled.button`
    color: #0095f6;
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
`

export default SuggestedProfile

SuggestedProfile.propTypes = {
    userDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
};

