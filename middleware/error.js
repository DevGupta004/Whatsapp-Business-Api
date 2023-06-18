const logger = require('../init/logger').logger;

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);

  console.log(`error : `, err);
  return res.status(400).json({
    status: {
      code: 400,
      message: err.message,
    }
  });

}
