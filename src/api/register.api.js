import Env from '../environment';

const userRegister = registerInfo => {
    const postReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo)
    }

    return fetch(`${Env.SERVER_URL}/register`, postReq)
        .then(res => res.json())
        .then(data => ({ success: true, result: data }))
        .catch(err => ({ success: false, result: err }))
}

export default userRegister;