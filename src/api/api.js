import userSignin from './signIn.api';
import userSignOut from './signOut.api';
import { getUserProfile, postUserProfile } from './profile.api';
import userRegister from './register.api';
import { postImageURl, putImage } from './image.api';
import { setAuthToken, getAuthToken, removeAuthToken } from './AuthToken.api';

const Api = {
    userSignin,
    userSignOut,
    getUserProfile,
    postUserProfile,
    userRegister,
    setAuthToken,
    getAuthToken,
    removeAuthToken,
    postImageURl,
    putImage,
}

export default Api;