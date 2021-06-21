import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { BsGrid3X3 } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { BsFillChatFill } from 'react-icons/bs'

const Photos = ({ photos }) => {
    return (
        <Container>
            <PostHeader>
                <span><BsGrid3X3 /> Posts</span>
            </PostHeader>
            {!photos ? (
                <>
                    <Skeleton count={12} width={320} height={320} />
                </>
            ): photos.length > 0 ? (
                <Images>
                {photos.map(photo => (
                    <Image key={photo.docId}>
                        <img src={photo.imageSrc} alt={photo.caption} />
                        <ImgHover>
                            <span>
                                <p>{photo.likes.length}</p>
                                <FaHeart size="20px" />
                            </span>
                            <span>
                                <p>{photo.comments.length}</p>
                                <BsFillChatFill
                                    size="20px"
                                    style={{transform: "rotateY(180deg)"}}
                                />
                            </span>
                        </ImgHover>
                    </Image>
                ))}
                </Images>
            ): null}
        </Container>
    )
}

const Container = styled.div`
    max-width: 975px;
    width: 100%;
    margin: 30px auto;

`

const PostHeader = styled.div`
    border-top: 1px solid #dbdbdb;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`

const Images = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fit, minmax(200px, 300px));
    gap: 28px;
    overflow: hidden;
`

const ImgHover = styled.div`
    visibility: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
        display: flex;
        align-items: center;

        &:nth-child(1) {
            margin-right: 20px;
        }
    }

    p {
        color: #fff;
        font-size: 20px;
        margin-right: 5px;
    }

    svg {
        color: #fff;
    }
`

const Image = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    &:hover {
        ${ImgHover}{
            visibility: visible;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .4);
        }
    }

    img {
        width: 100%;
        object-fit: cover;
        height: 100%;
    }
`



export default Photos

Photos.propTypes = {
    photos: PropTypes.array
};
  