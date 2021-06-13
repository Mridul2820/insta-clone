import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { formatDistance } from 'date-fns';
import AddComment from './AddComment';

const Comment = ({ docId, comments: allComments, posted, commentInput }) => {
    const [comments, setComments] = useState(allComments)

    return (
        <CommentWrap>
            <CommentMain>
                {comments.length >= 1 && (
                    <AllComment>
                        View all {comments.length} Comments
                    </AllComment>
                )}
                {comments.slice(0, 3).map((item) => (
                    <CommentLine key={`${item.comment}-${item.displayName}`}>
                        <Link to={`/p/${item.displayName}`}>
                            <UserName>{item.displayName}</UserName>
                        </Link>
                        <UserComment>{item.comment}</UserComment>
                    </CommentLine>
                ))}

                <PostTime>
                    {formatDistance(posted, new Date())} ago
                </PostTime>
            </CommentMain>

            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </CommentWrap>
    )
}

const CommentWrap = styled.div`
    padding:0 0 18px 0;
`

const CommentMain = styled.div`
    padding:0 18px ;
`

const AllComment =  styled.p`
    color: #8e8e8e;
    margin-bottom: 5px;
    font-size: 15px;
`

const CommentLine = styled.p`
    font-size: 15px;
    margin-bottom: 5px;
` 

const UserName = styled.span`
    font-weight: 600;
` 

const UserComment = styled.span`
    margin-left: 10px;
`

const PostTime = styled.p`
    color: #8e8e8e;
    font-size: 13px;
`

export default Comment

Comment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
};
