import { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

import Header from './Header';
import styled from 'styled-components';
import ImageLike from './ImageLike';
import Actions from './Actions';
import Caption from './Caption';
import Comment from './Comment';

const PostIndex = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    // Like Toggle
    const {
        user: { uid: userId }
    } = useContext(UserContext);

    const [toggleLiked, setToggleLiked] = useState(content.userLikedPhoto);
    const [likes, setLikes] = useState(content.likes.length);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection('photos')
            .doc(content.docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <PostArticle>
            <Header 
                username={content.username} 
            />
            <ImageLike
                src={content.imageSrc} 
                caption={content.caption} 
                handleToggleLiked={handleToggleLiked}
            />
            <Actions 
                handleFocus={handleFocus} 
                handleToggleLiked={handleToggleLiked}
                likes={likes}
                toggleLiked={toggleLiked}
            />
            <Caption 
                caption={content.caption} 
                username={content.username} 
            />
            <Comment 
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
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

export default PostIndex

PostIndex.propTypes = {
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
