import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile';

const Suggestions = ({ userId, following }) => {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following)

            setProfiles(response)
        }

        if (userId) {
            suggestedProfiles();
        }

        console.log('profiles', profiles);
    }, [userId])

    return (
        <SuggestionWrap>
            {!profiles ? (
                <Skeleton count={1} height={150} />

            ) : (profiles.length ? (
                <SuggestionMain>
                    <p>Suggestions For You</p>
                    <Profiles>
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                        />
                    ))}
                    </Profiles>
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

const Profiles = styled.div`

`

export default Suggestions

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array
};

