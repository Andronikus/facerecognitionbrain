import modalActionTypes from './modal.action.types';

const MODAL_INITIAL_STATE = {
    isModelOpen: false,
}

const modalReducer = (state=MODAL_INITIAL_STATE, action) => {

    switch(action.type){
        case modalActionTypes.TOGGLE_MODAL:
            return {
                isModelOpen: !state.isModelOpen,
            }
        default:
            return state;
    }
}

export default modalReducer;