import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile';

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following)

            setProfiles(response)
        }

        if (userId) {
            suggestedProfiles();
        }

        // console.log('profiles', profiles);
        // eslint-disable-next-line
    }, [userId])

    return (
        <SuggestionWrap>
            {!profiles ? (
                <Skeleton count={1} height={150} />

            ) : (profiles.length ? (
                <SuggestionMain>
                    <p>Suggestions For You</p>
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    ))}
                </SuggestionMain>
            ) : 
                null
            )}
        </SuggestionWrap>
    )
}

const SuggestionWrap = styled.div`
    margin-top: 10px;
`

const SuggestionMain = styled.div`

`

export default Suggestions

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};

