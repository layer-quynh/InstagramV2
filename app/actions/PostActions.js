import firebase from 'react-native-firebase';
import {
    POST_FETCH_ALL,
    POST_LIKE,
    POST_DISLIKE,
    POST_ADD_COMMENT,
    POST_SELECT_IMAGE,
    POST_ADD
} from './types';

export const fetchPosts = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/`)
            .child('posts')
            .on('value', snapshot => {
                if(snapshot.val() === null || snapshot.val() === undefined) {
                    let arrPosts = [];
                    dispatch({ type: POST_FETCH_ALL, payload: arrPosts });
                } else {
                    dispatch({ type: POST_FETCH_ALL, payload: snapshot.val() });
                }
            });
    };
};

export const like = (post, likes) => {
    const { currentUser } = firebase.auth();
    const newLikes = likes + 1;

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/posts/${post}/`)
            .update({
                likes: newLikes,
                liked: true
            })
            .then(() => {
                dispatch({
                    type: POST_LIKE
                })
            });
    };
};

export const dislike = (post, likes) => {
    const {currentUser} = firebase.auth();
    const newLikes = likes - 1;

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/posts/${post}/`)
            .update({
                likes: newLikes,
                liked: false
            })
            .then(() => {
                dispatch({
                    POST_DISLIKE
                })
            });
    };
};

export const sendMessage = (post, comments, newComment) => {
    const {currentUser} = firebase.auth();
    const newComments = comments + 1;

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/posts/${post}`)
            .update({
                comments_number: newComments
            })
            .then(() => {
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/posts/${post}/comments`)
                    .push({
                        username: 'Alvaro',
                        message: newComment
                    })
            })
            .then(() => {
                dispatch({
                    type: POST_ADD_COMMENT
                })
            });
    };
};

export const selectImage = url => ({
    type: POST_SELECT_IMAGE,
    payload: url
});

export const addPost = (image, location, description) => {
    const {currentUser} = firebase.auth();
    const date = new Date().toLocaleString();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/`)
            .child('posts')
            .push({
                username: 'Alvaro',
                userpic: 'https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.jpg',
                date: date,
                image: image,
                title: description,
                likes: 0,
                comments_number: 0,
                location: location,
                liked: false
            })
            .then(() => {
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/profile/posts_number/`)
                    .once('value', snapshot => {
                        const posts = snapshot.val() + 1;
                        firebase
                            .database()
                            .ref(`/users/${currentUser.uid}/profile/`)
                            .update({
                                posts_number: posts
                            });
                    });
            })
            .then(() => {
                dispatch({
                    type: POST_ADD
                })
            })
    }
}