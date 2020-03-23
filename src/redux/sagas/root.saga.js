import { all } from 'redux-saga/effects';
import { watchUserSignIn, watchUserSignOut } from './user/user.saga';

export default function* rootSaga(){
    yield all([
        watchUserSignIn(),
        watchUserSignOut()
    ])
}