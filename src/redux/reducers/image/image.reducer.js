import imageActionType from './image.action.types';

const IMAGE_INITIAL_STATE = {
    imageURL: '',
    faceBox: {}
}

const imageReducer = (state = IMAGE_INITIAL_STATE, action) => {
    switch (action.type) {
        case imageActionType.SET_IMAGE_INFO:
            return {
                ...state,
                ...action.payload,
            }
        case imageActionType.SET_IMAGE_URL:
            return {
                ...state,
                imageURL: action.payload,
            }
        default:
            return state;
    }
}

export default imageReducer;