import userActionsTypes from './user.action.types';

export const userSignIn = userSignInInfo => {
    return {
        type: userActionsTypes.USER_SIGN_IN,
        payload: userSignInInfo,
    }
}

export const userAlreadySigned = () => {
    return {
        type: userActionsTypes.USER_ALREADY_SIGNED,
    }
}

export const userSignOut = () => {
    return {
        type: userActionsTypes.USER_SIGN_OUT,
    }
}

export const setUserInfo = userInfo => {
    return {
        type: userActionsTypes.SET_USER_INFO,
        payload: userInfo
    }
}