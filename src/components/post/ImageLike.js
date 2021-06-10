import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { FaHeart } from 'react-icons/fa'

const ImageLike = ({ src, caption, handleToggleLiked }) => {
    const [likeAnim, setLikeAnim] = useState(false)

    const ImageClickLike = () => {
        setLikeAnim(true)
        handleToggleLiked()
    }

    return (
        <PostWrap>
        <PostImage>
            <ImgWrap>
                <img src={src} alt={caption} />
            </ImgWrap>
            
            <DoubleClick 
                onDoubleClick={ImageClickLike} 
            />
            <BigHeart
                onAnimationEnd={() => setLikeAnim(false)} 
                likeAnim={likeAnim}
            >
                <FaHeart size="85px" />
            </BigHeart>

        </PostImage></PostWrap>
    )
}

const PostWrap = styled.div`

`

const PostImage = styled.div`
    background-color: #efefef;
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    cursor: pointer;
`

const ImgWrap = styled.div`
    display: block;
    overflow: hidden;
    padding-bottom: 100%;

    img {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
`

const DoubleClick = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 10;
`

const BigHeartAnimation = keyframes`
    0%, 100% {
        opacity: 0;
        transform: scale(0);
    }
    15% {
        opacity: .9;
        transform: scale(1.2);
    }
    30% {
        transform: scale(.95);
    }

    45%, 80% {
        opacity: .9;
        transform: scale(1);
    }
`

const BigHeart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    pointer-events: none;
    animation: ${({ likeAnim }) => likeAnim ? css`${BigHeartAnimation} 1000ms ease-in-out` : 'none' } ;
    margin: 0 auto;
    opacity: 0;
    transform: scale(0);
`

export default ImageLike

ImageLike.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
};