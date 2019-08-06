import { PROFILE_FETCH } from '../actions/types';

const INITIAL_STATE = {};

const profile = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROFILE_FETCH:
            return {...state, profile: action.payload};
        default:
            return state;
    }
};

export default profile;