import styled from 'styled-components'
import PropTypes from 'prop-types'
import  { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const User = ({ fullName, username }) => {
    return (
        <div>
            { !fullName || !username ? (
                <Skeleton count={1} height={61} />
            ) : (
                <UserLink to={`/p/${username}`}>
                    <UserImg>
                    <img 
                        src={`/images/avatars/${username}.png`}
                        alt={`${username} profile`}
                    />
                    </UserImg>
                    <UserName>
                        <h4>{username}</h4>
                        <p>{fullName}</p>
                    </UserName>
                </UserLink>
            )}
        </div>
    )
}

const UserLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const UserImg = styled.div`
    height: 56px;
    width: 56px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
    }
`

const UserName = styled.div`
    margin-left: 15px;

    h4 {
        font-size: 14px;
    }

    p {
        color: #8e8e8e;
        font-size: 14px;
    }
`

export default User

User.propTypes =  {
    username: PropTypes.string,
    fullName: PropTypes.string
}
