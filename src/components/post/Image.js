import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = ({ src, caption }) => {
    return (
        <PostImage>
            <img src={src} alt={caption} />
        </PostImage>
    )
}

const PostImage = styled.div`
    width: 100%;
    max-height: 600px;
    height: 100%;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
        vertical-align: middle;
    }
`

export default Image

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
};
  
