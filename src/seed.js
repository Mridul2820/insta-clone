
export function seedDatabase(firebase) {
    const users = [
        {
            userId: 'sSswvCxSyCNNccZY3UOj24pLHWx1',
            username: 'i_mridul',
            fullName: 'Mridul Panda',
            emailAddress: 'mridul@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4', '5'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'subhrachitta_18',
            fullName: 'Subhrachitta Giri',
            emailAddress: 'subhrachitta@gmail.com',
            following: [],
            followers: ['sSswvCxSyCNNccZY3UOj24pLHWx1'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            username: 'ali.omar_7',
            fullName: 'Ali Omar',
            emailAddress: 'ali.omar@gamil.com',
            following: [],
            followers: ['sSswvCxSyCNNccZY3UOj24pLHWx1'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            username: '_polo_bacha',
            fullName: 'Poulami Jana',
            emailAddress: 'poulami@gamil.com',
            following: [],
            followers: ['sSswvCxSyCNNccZY3UOj24pLHWx1'],
            dateCreated: Date.now()
        },
        {
            userId: '5',
            username: 'maity_tushar_66',
            fullName: 'Tushar Maity',
            emailAddress: 'maity_tushar@gmail.com',
            following: [],
            followers: ['sSswvCxSyCNNccZY3UOj24pLHWx1'],
            dateCreated: Date.now()
        }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
        firebase
        .firestore()
        .collection('photos')
        .add({
            photoId: i,
            userId: 'sSswvCxSyCNNccZY3UOj24pLHWx1',
            imageSrc: `/images/users/i_mridul/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
                {
                displayName: 'subhrachitta_18',
                comment: 'Love this place, looks like my animal farm!'
                },
                {
                displayName: 'ali.omar_7',
                comment: 'Would you mind if I used this picture?'
                }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        });
    }
}
  