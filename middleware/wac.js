const axios = require('axios');

module.exports = (req, res, next) => {

  try {

    axios.get( process.env.WAC_BASE_URL + 'orgId/' + req.userData.orgId, {
      headers: {
        Authorization: req.headers.authorization
      }
    } ).then(function (response) {

      const wac = response.data;

      if (wac.status && wac.status.code == 401) {

        return res.status(401).json({
          status: {
            message: "Auth Failed!",
            code: 401,
          },
        });

      } else {
        req.wac = wac.data[0];
        next();
      }
    })
      .catch(function (error) {
        console.log("axios error : ", error);
        return res.status(403).json({
          status: {
            message: "Unable to connect to Authentication",
            code: 403,
          },
        });
      });

  } catch (e) {
    console.log(e);
    res.status(401).json({
      status: {
        message: "No WAC!",
        code: 401,
      },
    });
  }
};
