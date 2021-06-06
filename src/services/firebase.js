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