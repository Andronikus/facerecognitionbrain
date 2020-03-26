import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {logger} from 'redux-logger';

import reducer from './root.reducer';
import rootSaga from '../redux/sagas/root.saga';

const middleware = [];

if(process.env.NODE_ENV !== 'production'){
    middleware.push(logger);
}

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;