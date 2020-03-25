import { combineReducers} from 'redux';

import userReducer from './reducers/user/user.reducer';
import routeReducer from './reducers/route/route.reducer';
import imageReducer from './reducers/image/image.reducer';

const reducer = combineReducers({
    user: userReducer,
    route: routeReducer,
    image: imageReducer,
});

export default reducer;