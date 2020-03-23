import Env from '../environment';

const getUserProfile = (userId, authorizationToken) => {

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

export default getUserProfile;