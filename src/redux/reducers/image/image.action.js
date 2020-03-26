import imageActionType from './image.action.types';

export const submitImage = imageUrl => {
    return {
        type: imageActionType.SUBMIT_IMAGE,
        payload: imageUrl,
    }
}

export const setImageInfo = imageInfo => {
    return {
        type: imageActionType.SET_IMAGE_INFO,
        payload: imageInfo,
    }
}

export const setImageURL = imageUrl => {
    return {
        type: imageActionType.SET_IMAGE_URL,
        payload: imageUrl,
    }
}