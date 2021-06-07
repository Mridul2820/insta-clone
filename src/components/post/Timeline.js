import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/usePhotos'

const Timeline = () => {
    const { photos } = usePhotos();

    console.log('photos', photos);

    return (
        <TimelineWrap>
            this is iTimeline
        </TimelineWrap>
    )
}

const TimelineWrap = styled.div`
    grid-column: 1/3;
`

export default Timeline

// https://youtu.be/AKeaaa8yAAk?t=21317