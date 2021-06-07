import styled from 'styled-components';
import useUser from '../../hooks/useUser'

import User from './User'
import Suggestions from './Suggestions'

const SideBar = () => {
    const { user : { fullName, username, userId, following } } = useUser()

    return (
        <SideBarWrap>
            <User fullName={fullName} username={username}/>
            <Suggestions userId={userId} following={following} />
        </SideBarWrap>
    )
}

const SideBarWrap = styled.div`
    padding: 4px;
`

export default SideBar