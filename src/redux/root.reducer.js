import { combineReducers} from 'redux';

import userReducer from './reducers/user/user.reducer';
import routeReducer from './reducers/route/route.reducer';

const reducer = combineReducers({
    user: userReducer,
    route: routeReducer
});

export default reducer;