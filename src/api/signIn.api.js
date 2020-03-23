import Env from '../environment';

const userSignin = signInInfo => {

    const postReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInInfo)
    }

    return fetch(`${Env.SERVER_URL}/signin`, postReq)
        .then(resp => resp.json())
        .then(data => ({ success: true, result: data }))
        .catch(err => ({ success: false, result: err }))
}

export default userSignin;