import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import styled from 'styled-components';
import Image from './Image';
import Actions from './Actions';
import Caption from './Caption';

const Post = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <PostArticle>
            <Header 
                username={content.username} 
            />
            <Image 
                src={content.imageSrc} 
                caption={content.caption} 
            />
            <Actions 
                docId={content.docId} 
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus} 
            />
            <Caption 
                caption={content.caption} 
                username={content.username} 
            />
        </PostArticle>
    )
}

const PostArticle = styled.article`
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    background: #ffffff;
    margin-bottom: 50px;
`

export default Post

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};

// https://youtu.be/AKeaaa8yAAk?t=24502
