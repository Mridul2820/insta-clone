import styled from 'styled-components';
import useUser from '../../hooks/useUser'

import User from './User'
import Suggestions from './Suggestions'

const SideBarIndex = () => {
    const { user : { docId, fullName, username, userId, following } } = useUser()

    return (
        <SideBarWrap>
            <SideBarMain>
                <User 
                    fullName={fullName} 
                    username={username}
                />
                <Suggestions 
                    userId={userId} 
                    following={following} 
                    loggedInUserDocId={docId} 
                />
            </SideBarMain>
        </SideBarWrap>
    )
}

const SideBarWrap = styled.div`
    padding: 4px;

    @media screen and (max-width: 1000px) {
        display: none;
    }
`

const SideBarMain = styled.div`
    position: sticky;
    top: 88px;
`

export default SideBarIndex
