import PropTypes from 'prop-types';

import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { BsChat } from 'react-icons/bs'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { FaRegBookmark } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components';

const Actions = ({ likes, toggleLiked, handleToggleLiked, handleFocus }) => {

    return (
        <ActionsWrap>
            <LikeComment>
                <div>
                    <Heart
                        onClick={handleToggleLiked}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleToggleLiked();
                            }
                        }}
                    >
                    {toggleLiked 
                        ? <FaHeart size="26px" style={{  fill: "#ed4956" }}/>
                        : <FaRegHeart size="26px" />
                    }
                    </Heart>

                    <BsChat 
                        onClick={handleFocus}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleFocus();
                            }
                        }}
                        size="25px"
                        style={{transform: "rotateY(180deg)"}}
                    />
                    <IoPaperPlaneOutline size="27px" />
                </div>
                <FaRegBookmark size="24px" />
            </LikeComment>
            <TotalLikes>
                <p>{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </TotalLikes>
        </ActionsWrap>
    )
}

const ActionsWrap = styled.div`
    padding: 15px 15px 10px 15px;
`
const LikeComment = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    
    > div {
        display: flex;
        align-content: center;
        justify-content: space-between;
        width: 100px;
    }

    svg {
        cursor: pointer;
    }
`

const HeartAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    25% {
        transform: scale(1.2);
    }
    50% {
        transform: scale(.95);
    }
`

const Heart = styled.div`
    > svg{
        animation: ${HeartAnimation} .45s ease-in-out;
        transform: scale(1);
    }
`

const TotalLikes = styled.div`
    margin-top: 5px;
    margin-left: 5px;

    p {
        font-size: 14px;
        color: #262626;
        font-weight: 600;
    }
`


export default Actions

Actions.propTypes = {
    handleFocus: PropTypes.func.isRequired
};
