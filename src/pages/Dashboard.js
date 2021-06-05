import React, { useEffect } from 'react'
import styled from 'styled-components'

import Header from '../components/Header'
import Timeline from '../components/Timeline'
import SideBar from '../components/sidebar/SideBar'

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Instagram'
    }, [])

    return (
        <div>
            <Header/>
            <DashBoardWrap>
                <Timeline />
                <SideBar />
            </DashBoardWrap>
        </div>
    )
}

const DashBoardWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 935px;
    padding-top: 30px;
    margin: 0 auto;
    gap: 1.5rem;
`

export default Dashboard

// https://youtu.be/AKeaaa8yAAk?t=12079