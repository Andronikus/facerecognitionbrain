import Env from '../environment';

export const getUserProfile = (userId, authorizationToken) => {

  return fetch(`${Env.SERVER_URL}/profile/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorizationToken
    }
  })
    .then(res => res.json())
    .then(data => ({ succeed: true, result: data }))
    .catch(err => ({ succeed: false, result: err }))
}

export const postUserProfile = (userInfo, authToken) => {

    const postRew = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': authToken,
      },
      body: JSON.stringify({ formProfile: userInfo })
    }

    fetch(`${Env.SERVER_URL}/profile/${userInfo.id}`, postRew)
    .then(res => {
      const {status} = res;
      
      if(status !== 200 && status !== 304){
        throw new Error({ succeed: false, result: status })
      }
    })
    .catch(err => { throw new Error({ succeed: false, result: err })})
}
