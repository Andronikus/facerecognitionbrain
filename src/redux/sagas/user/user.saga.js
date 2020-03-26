import { takeEvery, call, put } from 'redux-saga/effects';

import Api from '../../../api/api';
import { setUserInfo } from '../../reducers/user/user.action';
import { toggleModal } from '../../reducers/modal/modal.action';
import { goHome, goSignIn } from '../../reducers/route/route.action';
import userActionTypes from '../../reducers/user/user.action.types';


function* userSignIn(action){
    try{
        const signinResult = yield call(Api.userSignin, action.payload);
        const userProfile = yield call(Api.getUserProfile, signinResult.result.userId,signinResult.result.token);
        yield call(Api.setAuthToken,signinResult.result.token);
        const {result} = userProfile;
        yield put(setUserInfo({...result, rank: result.entries, joinedAt: result.joined_at, isSignedIn: true}));
        yield put(goHome());
    }
    catch(error){
        console.log('error', error);
    }
}

function* userAlreadySignedIn(){
    try{
        const authToken = yield call(Api.getAuthToken);
        const signinResult = yield call(Api.userSignin, {}, authToken);
        const userProfile = yield call(Api.getUserProfile, signinResult.result.userId,authToken);
        const {result} = userProfile;
        yield put(setUserInfo({...result, rank: result.entries, joinedAt: result.joined_at, isSignedIn: true}));
        yield put(goHome());
    }
    catch(error){
        console.log('error', error);
    }
}

function* userSignOut(){
    try{
        const authToken = yield call(Api.getAuthToken);
        yield call(Api.userSignOut,authToken);
        yield call(Api.removeAuthToken);
        yield put(goSignIn());

    }catch(error){
        console.log(error);
    }
}

function* userUpdate(action){
    const userInfo = action.payload;
    const authToken = yield call(Api.getAuthToken);
    yield call(Api.postUserProfile, userInfo, authToken);
    yield put(setUserInfo(userInfo));
    yield put(toggleModal());
}

export function* watchUserSignIn(){
    yield takeEvery(userActionTypes.USER_SIGN_IN, userSignIn);
}

export function* watchUserSignOut(){
    yield takeEvery(userActionTypes.USER_SIGN_OUT, userSignOut);
}

export function* watchUserAlreadySignedIn(){
    yield takeEvery(userActionTypes.USER_ALREADY_SIGNED, userAlreadySignedIn);
}

export function* watchUserProfileSave(){
    yield takeEvery(userActionTypes.SAVE_USER_PROFILE, userUpdate);
}
