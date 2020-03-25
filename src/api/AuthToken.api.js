const AUTH_TOKEN_NAME = 'sm-token';

export const setAuthToken = (token, storageType='session') => {
    if(storageType && storageType === 'session'){
        return window.sessionStorage.setItem(AUTH_TOKEN_NAME, token);
    }else{
        return window.localStorage.setItem(AUTH_TOKEN_NAME, token);
    }
}

export const getAuthToken = (storageType='session') => {
    if(storageType && storageType === 'session'){
        return window.sessionStorage.getItem(AUTH_TOKEN_NAME);
    }
    return window.localStorage.getItem(AUTH_TOKEN_NAME);
}

export const removeAuthToken = (storageType='session') => {
    if(storageType && storageType === 'session'){
        return window.sessionStorage.removeItem(AUTH_TOKEN_NAME);
    }
    return window.localStorage.removeItem(AUTH_TOKEN_NAME);
}