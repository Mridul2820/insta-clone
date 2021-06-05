import { useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components';

import { AiFillHome, AiOutlineHeart } from 'react-icons/ai'
import { FaFacebookMessenger } from "react-icons/fa"
import { MdExitToApp } from 'react-icons/md'

import FirebaseContext from '../context/firebase'
import UserContext from '../context/user';

import * as ROUTES from '../constants/routes'


const Header = () => {
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)

    const history = useHistory()

    console.log('user', user);

    return (
        <HaederMain>
            <HeaderContainer>
                <HeaderLogo>
                    <Link to={ROUTES.DASHBOARD} >
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </HeaderLogo>
                <HeaderRight>
                {user ? (
                    <HeaderIcons>
                        <Link to={ROUTES.DASHBOARD} >
                            <AiFillHome size="24px" />
                        </Link>
                        <Link to={ROUTES.DASHBOARD} >
                            <FaFacebookMessenger size="22px" />
                        </Link>
                        <AiOutlineHeart size="25px"  />
                        <LogOut
                            type="button"
                            title="Sign Out"
                            onClick={() => {
                                firebase.auth().signOut()
                                history.push(ROUTES.LOGIN)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    firebase.auth().signOut();
                                    history.push(ROUTES.LOGIN);
                                }
                            }}
                        >
                            <MdExitToApp size="23px"  />
                        </LogOut>
                        <ProfileIcon to={`/p/${user.displayName}`}>
                            <img 
                                src={`/images/avatars/${user?.displayName}.png`}
                                alt={`${user?.displayName} profile`}
                            />
                        </ProfileIcon>
                    </HeaderIcons>
                ):(
                    <HeaderButtons>
                        <Link to={ROUTES.LOGIN}>
                            <Button type="button">Log In</Button>
                        </Link>
                        <Link to={ROUTES.SIGN_UP}>
                            <Button type="button">Sign Up</Button>
                        </Link>
                    </HeaderButtons>
                )}
                </HeaderRight>
            </HeaderContainer>
            
        </HaederMain>
    )
}

const HaederMain = styled.header`
    height: 54px;
    background: #ffffff;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HeaderContainer = styled.div`
    max-width: 975px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderLogo = styled.div`
    min-width: 40px;
    height: 28px;

    img {
        height: 100%;
        object-fit: contain;
    }
`
const HeaderRight = styled.div`
    padding-left: 8px;
`

const HeaderIcons = styled.div`
    display: flex;
    align-items: center;

    > * {
        margin-left: 22px;
    }
`

const LogOut = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
`

const ProfileIcon = styled(Link)`

    img {
        height: 26px;
        width: 26px;
        border-radius: 50%;
        overflow: hidden;
    }
`

const HeaderButtons = styled.div``

const Button = styled.button`
    margin: 0 8px;
    border: 1px solid transparent;
    background-color: #0095f6;
    color: #fff;
    border-radius: 4px;
    padding: 5px 9px;
    cursor: pointer;
`

export default Header
