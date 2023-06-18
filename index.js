const logger = require('./init/logger').logger;
const app = require('./app');

app.use((err, req, res, next) => {
  logger.error(err);

  switch (err.code) {
    case 'EACCES':
      console.error('Elevated privileges required');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw err;

  }

  return res.status(400).json({
    status: {
      code: 400,
      message: err.message,
      error: err.message,
    }
  });
});

process.on('unhandledRejection', (exception) => {
  throw exception;
});
process.on('uncaughtException', (exception) => {
  throw exception;
});

logger.info('Application running in: ' + process.env.BRANCH_NAME);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Running on port : ${port}`));