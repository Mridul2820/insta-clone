import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/usePhotos'

const Timeline = () => {
    const { photos } = usePhotos();

    console.log('photos', photos);

    return (
        <TimelineWrap>
        {!photos ? (
            <>
            {[...new Array(4)].map((_, index) => 
                <Skeleton 
                    key={index} 
                    count={1} 
                    width={600} 
                    height={500}
                />
            )}
            </>
        ) : photos?.length > 0 ? (
            photos.map(content => (
                <div key={content.docId}>
                    <img src={content.imageSrc} alt="" />
                    <p >{content.imageSrc}</p>
                </div>
                
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

export default Timeline

// https://youtu.be/AKeaaa8yAAk?t=22201