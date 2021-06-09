import PropTypes from 'prop-types';
import styled from 'styled-components';

const Caption = ({caption, username }) => {
    return (
        <CaptionWrap>
            <Username>{username}</Username>
            <PostCaption>{caption}</PostCaption>
        </CaptionWrap>
    )
}

const CaptionWrap = styled.div`
    padding:0 18px 18px 18px;
`

const Username = styled.span`
    font-weight: 600;
    font-size : 14px;
    color: #262626;
    margin-right: 5px;
`

const PostCaption = styled.span`

`

export default Caption

Caption.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };
  