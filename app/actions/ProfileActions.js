import { PROFILE_FETCH } from './types';
import firebase from 'react-native-firebase';

export const fetchProfile = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .on('value', snapshot => {
                // console.warn(snapshot.val());
                dispatch({
                    type: PROFILE_FETCH,
                    payload: snapshot.val()
                });
            });
    };
};