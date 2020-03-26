import routeActionTypes from './route.action.types';

const INITIAL_ROUTE_STATE = {
    currentRoute: 'signIn',
}

const routeReducer = (state=INITIAL_ROUTE_STATE, action) => {
    switch(action.type){
        case routeActionTypes.SIGN_IN:
            return {
                ...state,
                currentRoute: 'signIn'
            }
        case routeActionTypes.REGISTER:
            return {
                ...state,
                currentRoute: 'register'
            }
        case routeActionTypes.HOME:
            return {
                ...state,
                currentRoute: 'home'
            }
        default:
            return state;
    }
}

export default routeReducer;