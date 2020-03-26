// reducer for user state
import actionActionTypes from './user.action.types';

const USER_INITIAL_STATE = {
    id: '',
    name: '',
    rank: 0,
    joinedAt: '',
    age: '',
    pet: '',
    isSignedIn: false,
}

const userReducer = (state=USER_INITIAL_STATE, action) => {
    switch(action.type){
        case actionActionTypes.SET_USER_ID:
            return {
                ...state,
                id: action.payload.userId
            }
        case actionActionTypes.SET_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        case actionActionTypes.USER_SIGN_OUT:
            return {
                state: USER_INITIAL_STATE
            }
        default:
            return state;
    }
}

export default userReducer;