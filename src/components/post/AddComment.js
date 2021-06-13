import { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import { Button } from '../../GlobalStyles'

const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [comment, setComment] = useState('')
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const { user: { displayName }  } = useContext(UserContext);
    
    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([...comments, { displayName, comment }]);
        setComment('');
    
        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
        });
    };


    return (
        <Container>
            <Form
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
                >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <Button
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </Button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    margin-top: 10px;
    padding: 10px 18px 0 18px;
    border-top: 1px solid #efefef;

    ${Button} {
        margin: 0;
        border: none;
        background-color: transparent;
        color: #0095f6;

        &:disabled {
            opacity: .5;
        }
    }
`

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;

    input {
        width: 100%;
        border: none;
        outline: none;
    }
`

export default AddComment

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
};
  