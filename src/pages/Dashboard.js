import React, { useEffect } from 'react'
import styled from 'styled-components'

import Header from '../components/Header'
import Timeline from '../components/Timeline'
import SideBarIndex from '../components/sidebar/SideBarIndex'

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Instagram'
    }, [])

    return (
        <div>
            <Header/>
            <DashBoardWrap>
                <Timeline />
                <SideBarIndex />
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

    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 625px;
        margin: 0 auto;
    }

    @media screen and (max-width: 650px) {
        margin: 0 20px;
    }

    @media screen and (max-width: 480px) {
        padding-top: 20px;
        margin: 0 10px;
    }
`

export default Dashboard
