const axios = require('axios');
const {Response} = require('../classes/response');
/**
 * @description - middleware for checking the permissions for the resource
 * @param {number} resourceIndex - index of the resource
 * */
module.exports = (resourceIndex) => {
  return async (req, res, next) => {
    if(
      req.headers['x-consumer'] &&
      req.headers['x-consumer'].length &&
      req.headers['x-consumer'] === 'maya' &&
      req.headers.authorization &&
      req.headers.authorization.length
    ) {
      try {
        const user = await getUserData(req.userData.userId);
        if(user && user.role === 'admin') {
          next();
        } else {
          if(!user.permissions.length) {
            return res.status(401).json(new Response(401, 'Permission Denied'));
          }
          if(isUserHasAccess(user.permissions, req.method, resourceIndex)) {
            next();
          } else {
            return res.status(401).json(new Response(401, 'Permission Denied'));
          }
        }
      } catch(error) {
        console.log(error);
        return res.status(401).json(new Response(401, 'Permission Denied'));
      }
    } else {
      next();
    }
  }
}

async function getUserData(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        url: (process.env.USERS_BASE_URL || 'http://localhost:3003/users/') + userId,
        method: 'get',
        headers: {
          'Authorization': process.env.GLOBAL_JWT || 'global_jwt_fndsjkbgj23432fdfb',
          'Content-Type': 'application/json'
        }
      }
      const response = await axios(options);
      resolve(response.data.data);
    } catch (error) {
      reject(error);
    }
  })
}

function isUserHasAccess(permissions, method, resourceIndex) {
  let access = false;

  console.log('logging the permissions');
  console.log(permissions);

  console.log('logging the method');
  console.log(method);

  switch(method) {
    case 'GET':
      access = permissions[resourceIndex][0];
      break;
    case 'POST':
      access = permissions[resourceIndex][1];
      break;
    case 'PUT':
      access = permissions[resourceIndex][2];
      break;
    case 'DELETE':
      access = permissions[resourceIndex][3];
      break;
  }

  return !!access;
}
