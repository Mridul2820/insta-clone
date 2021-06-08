import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { BsThreeDots } from 'react-icons/bs'

const Header = ({ username }) => {
    return (
        <PostHeader>
            <PostUser to={`/p/${username}`}>
                <img 
                    src={`/images/avatars/${username}.png`}
                    alt={`${username} profile`}
                />
                <p>{username}</p>
            </PostUser>
            <BsThreeDots />
        </PostHeader>
    )
}

const PostHeader = styled.header`
    height: 60px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
`

const PostUser = styled(Link)`
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
    }

    p {
        color: #262626;
        font-weight: 600;
        font-size: 14px;
    }
`

export default Header

Header.propTypes = {
    username: PropTypes.string.isRequired
};
  
