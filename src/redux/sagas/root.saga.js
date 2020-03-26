import { all } from 'redux-saga/effects';
import { watchUserSignIn, watchUserSignOut, watchUserAlreadySignedIn, watchUserProfileSave } from './user/user.saga';
import { watchSubmitImage } from './image/image.saga';

export default function* rootSaga(){
    yield all([
        watchUserSignIn(),
        watchUserSignOut(),
        watchUserAlreadySignedIn(),
        watchSubmitImage(),
        watchUserProfileSave(),
    ])
}