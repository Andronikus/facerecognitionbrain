import Env from '../environment';

const userSignin = (signInInfo, authToken) => {

    const headers = {
        'Content-Type': 'application/json',
    }

    if(authToken){
        headers['Authorization'] = authToken;
    }

    const postReq = {
        method: 'POST',
        headers,
        body: JSON.stringify(signInInfo)
    }

    return fetch(`${Env.SERVER_URL}/signin`, postReq)
        .then(resp => resp.json())
        .then(data => ({ success: true, result: data }))
        .catch(err => ({ success: false, result: err }))
}

export default userSignin;