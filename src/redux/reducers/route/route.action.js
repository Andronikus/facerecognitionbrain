import routeActionTypes from './route.action.types';

export const goSignIn = () => {
    return {
        type: routeActionTypes.SIGN_IN,
    }
}

export const goRegister = () => {
    return {
        type: routeActionTypes.REGISTER,
    }
}

export const goHome = () => {
    return {
        type: routeActionTypes.HOME,
    }
}