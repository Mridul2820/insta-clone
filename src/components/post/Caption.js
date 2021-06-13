import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShowMoreText from 'react-show-more-text';

const Caption = ({caption, username }) => {
    return (
        <CaptionWrap>
            <Username>{username}</Username>
            <ShowMore
                lines={2}
                more='more'
                less='less'
                anchorClass='more-less'
                expanded={false}
                width={500}
            >
                {caption}
            </ShowMore>
        </CaptionWrap>
    )
}

const CaptionWrap = styled.div`
    padding:0 18px 8px 18px;
`

const Username = styled.span`
    font-weight: 600;
    font-size : 16px;
    color: #262626;
    margin-right: 5px;
`

const ShowMore = styled(ShowMoreText)`
    display: inline;
    font-size : 16px;

    .more-less {
        color: #8e8e8e;
    }
`

export default Caption

Caption.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};
  