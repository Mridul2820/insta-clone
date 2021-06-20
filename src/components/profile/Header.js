import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import useUser from '../../hooks/useUser'
import { isUserFollowingProfile } from '../../services/firebase'
import styled from 'styled-components'
import { Button } from '../../GlobalStyles'

const Header = ({ 
    photosCount, 
    profile:{
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers = [],
        following = [],
        username: profileUsername
    }, 
    followerCount, 
    setFollowerCount 
}) => {
    const { user } = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)

    const activeBtnFollow = user?.username && user?.username !== profileUsername;

    const handleToggleFollow = () => {
        setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)

        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        });
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async() => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId)

            setIsFollowingProfile(!!isFollowing)
        }

        if(user.username && profileUserId) {
            isLoggedInUserFollowingProfile()
        }
    }, [user.username, profileUserId])
    
    return (
        <Container>
            <UserImg>
            {profileUsername ? 
                (<img 
                    src={`/images/avatars/${profileUsername}.png`} 
                    alt={`${profileUsername} profile`} 
                />) : (<Skeleton circle height={150} width={150} count={1} />)
            }
            </UserImg>
            <UserDetails>
                <UserTop>
                    <h2>{profileUsername}</h2>
                    {activeBtnFollow && (
                        <Button
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
                </UserTop>
                <UserMid>
                {followers === undefined || following === undefined ? (
                    <Skeleton count={1} width={677} height={24} />
                ) : (
                    <>
                        <p>
                            <span>{photosCount}</span> photos
                        </p>
                        <p>
                            <span>{followerCount}</span>
                            {` `}
                            {followerCount === 1 ? `follower` : `followers`}
                        </p>
                        <p>
                            <span>{following?.length}</span> following
                        </p>
                    </>
                )}
                </UserMid>
            </UserDetails>
        </Container>
    )
}

const Container = styled.header`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 975px;
    margin: 0 auto;
`
const UserImg = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
    }
`
const UserDetails = styled.div`
    grid-column: 2/4;
`

const UserTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    ${Button} {
        padding: 5px 24px;
        font-size: 14px;
    }

    h2 {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #262626;
        font-weight: 300;
        font-size: 28px;
        line-height: 32px;
    }
`

const UserMid = styled.div`
    display: flex;

    p {
        margin-right: 40px;
        font-size: 16px;
    }

    span {
        color: #262626;
        font-weight: 600;
    }
`


export default Header

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};
  