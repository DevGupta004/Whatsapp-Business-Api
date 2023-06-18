const { UAParser } = require("ua-parser-js");
// you need to pass the user-agent for nodejs

/**
 * @description - get the transcoding status for a videoId
 * @param {Array} payments -
 * @param {object} headers -
 */
const filterPayments = (payments, headers, queryParams) => {
  return new Promise((resolve, reject) => {
    try {
      let parser = new UAParser(headers["user-agent"]);
      const devices = parser.getDevice();
      const deviceOS = parser.getOS();
      console.log(`getOs :: ${deviceOS.name} , queryParams : ${JSON.stringify(queryParams)} , getVendor : ${devices.vendor}\n get device type: ${devices.type}`);

      if ( (deviceOS.name === "iOS" && queryParams.source == "ios") || (deviceOS.name === "Mac OS" && queryParams.source == "ios") ) {
        payments = payments.filter((obj) => obj.source == "ios");
      }
      else if ( deviceOS.name === "Android" && queryParams.source == "android" ) {
        payments = payments.filter((obj) => obj.source != "ios");
      }

      return resolve(payments);
    } catch (err) {
      console.log("error in filterPayments : ", err);
      resolve(payments);
    }
  });
};

module.exports = { filterPayments };
