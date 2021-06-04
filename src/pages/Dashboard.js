import React, { useEffect } from 'react'
import styled from 'styled-components'

import Header from '../components/Header'
import Timeline from '../components/Timeline'
import SideBar from '../components/SideBar'

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

`

export default Dashboard

// https://youtu.be/AKeaaa8yAAk?t=11826