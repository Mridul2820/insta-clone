import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/usePhotos'
import PostIndex from './post/PostIndex'

const Timeline = () => {
    const { photos } = usePhotos();

    // console.log('photos', photos);

    return (
        <TimelineWrap>
        {!photos ? (
            <TimelineSkeleton 
                count={4} 
                width={600} 
                height={500}
            />
        ) : photos?.length > 0 ? (
            photos.map(content => (
                <PostIndex key={content.docId} content={content} />
            ))
        ) : (
            <p>Follow people to see posts</p>
        )}
        </TimelineWrap>
    )
}

const TimelineWrap = styled.div`
    grid-column: 1/3;
`

const TimelineSkeleton = styled(Skeleton)`
    margin-bottom: 14px;
`

export default Timeline
