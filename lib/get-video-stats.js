const axios = require('axios');
/**
 * @description - get the transcoding status for a videoId
 * @param {string} appId -
 * @param {string} packageId -
 */
const getVideoStats = (appId, packageId) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: process.env.BASE_DRIVES_URL + `package/${packageId}`,
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "app-id": appId
      }
    };

    axios(options)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject(error);
      });

  })
};

module.exports = { getVideoStats }
