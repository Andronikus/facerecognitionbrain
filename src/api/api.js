import userSignin from './signIn.api';
import userSignOut from './signOut.api';
import getUserProfile from './getProfile.api';
import userRegister from './register.api';
import { setAuthToken, getAuthToken, removeAuthToken } from './AuthToken.api';

const Api = {
    userSignin,
    userSignOut,
    getUserProfile,
    userRegister,
    setAuthToken,
    getAuthToken,
    removeAuthToken
}

export default Api;