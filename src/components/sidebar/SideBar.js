import styled from 'styled-components';
import useUser from '../../hooks/useUser'

import User from './User'
import Suggestions from './Suggestions'

const SideBar = () => {
    const { user } = useUser()

    console.log('user', user);
    return (
        <SideBarWrap>
            <User />
            <Suggestions />
        </SideBarWrap>
    )
}

const SideBarWrap = styled.div`
    padding: 4px;
`

export default SideBar
