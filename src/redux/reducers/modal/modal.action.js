import modalActionTypes from './modal.action.types';

export const toggleModal = () => {
    return {
        type: modalActionTypes.TOGGLE_MODAL,
    }
}