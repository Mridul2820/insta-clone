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

    img {
        width: 100%;
    }
`

export default Image

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
};
  
