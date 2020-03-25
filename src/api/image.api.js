import Env from '../environment';

export const postImageURl = (imageURL, authToken) => {
    const postReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
        body: JSON.stringify({ input: imageURL })
    }

    return fetch(`${Env.SERVER_URL}/imageURL`, postReq)
        .then(res => res.json())
        .then(imageData => ({ success: true, result: imageData }))
        .catch(err => { throw new Error({ success: false, result: err })})
}


export const putImage = (userInfo, authToken) => {
    const postReq = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
        body: JSON.stringify(userInfo)
    }

    return fetch(`${Env.SERVER_URL}/image`, postReq)
        .then(res => res.json())
        .then(data => ({ success: true, result: data }))
        .catch(err => { throw new Error({ success: false, result: err })})
}