import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
  
    return result.docs.length > 0;
}


// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
  
    return user;
}

// check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');

    const result = await query.limit(10).get();

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (my's profile)
    profileId, // the user that I request to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
            ? FieldValue.arrayRemove(profileId)
            : FieldValue.arrayUnion(profileId)
        });
}
  
export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (my's profile)
    loggedInUserDocId, // the user that I request to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
            ? FieldValue.arrayRemove(loggedInUserDocId)
            : FieldValue.arrayUnion(loggedInUserDocId)
        });
}


export async function getPhotos(userId, following) {

    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)
      .get();
  
    const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
  
    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const user = await getUserByUserId(photo.userId);

            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );
  
    return photosWithUserDetails;
}