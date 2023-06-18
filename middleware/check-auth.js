const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    if(req.headers.authorization) {
      try {

        // if (req.headers['app-id'] && req.headers['app-id'].length === 24) {
        //   req.userData = {
        //     wacId: req.headers['app-id'] ? req.headers['app-id'] : '',
        //   };
        //   next();
        // }

        const response = await axios.get( process.env.JWT_BASE_URL + req.headers.authorization);
        const authData = response.data;
        if (authData.status && authData.status.code === 401) {
          return res.status(401).json({
            status: {
              message: "Auth Failed!",
              code: 401,
            },
          });

        } else {
          req.userData = {
            email: authData.data.email,
            userId: authData.data?.userId || authData.data?.ottUserId,
            mobile: authData.data.mobile,
            orgId: authData.data.orgId,
            wacId: authData.data.wacId,
          };

          if(req.headers.authorization === process.env.GLOBAL_JWT){
            req.userData.wacId = req.headers['app-id'];
          }
          next();
        }

      } catch (err) {
        console.log("axios error : ", error);
        return res.status(403).json({
          status: {
            message: "Unable to connect to Authentication",
            code: 403,
          },
        });
      }
    } else if (req.headers['app-id'] && req.headers['app-id'].length === 24) {
      req.userData = {
        wacId: req.headers['app-id'] ? req.headers['app-id'] : '',
      };
      next();
    } else {
      res.status(401).json({
        status: {
          message: "Access Denied (Invalid app-id)",
          code: 401,
        },
      });
    }
  } catch (e) {
    res.status(401).json({
      status: {
        message: "Auth Failed!",
        code: 401,
      },
    });
  }
};
