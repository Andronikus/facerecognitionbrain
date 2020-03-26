import { takeEvery, call, put } from 'redux-saga/effects';

import imageActionType from '../../reducers/image/image.action.types';
import api from '../../../api/api';
import { calculateFaceLocation } from '../../../utils/faceLocation';
import { setImageInfo,setImageURL } from '../../reducers/image/image.action';
import { setUserInfo } from '../../reducers/user/user.action';

function* submitImage(action){
    
    const {userID, imageURL} = action.payload;
    
    try{
        yield put(setImageURL(imageURL));
        const authToken = yield call(api.getAuthToken);
        const imageUrlResult = yield call(api.postImageURl,imageURL,authToken);
        const faceBox = calculateFaceLocation(imageUrlResult.result);
        yield put(setImageInfo({faceBox, imageURL}));
        const userInfoResult = yield call(api.putImage, {id: userID},authToken);
        yield put(setUserInfo({rank: userInfoResult.result.rank}));
    }catch(err){
        console.log('submitImage::', err);
    }
}

export function* watchSubmitImage(){
    yield takeEvery(imageActionType.SUBMIT_IMAGE, submitImage);
}