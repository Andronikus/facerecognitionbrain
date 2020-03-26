import Env from '../environment';

const userSignOut = authToken => {

    const postReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({authToken})
    }

    return fetch(`${Env.SERVER_URL}/logout`, postReq)
        .then(resp => resp.json())
        .then(data => ({ success: true, result: data }))
        .catch(err => ({ success: false, result: err }))
}

export default userSignOut;