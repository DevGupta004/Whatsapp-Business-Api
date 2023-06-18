const redis = require('redis');
const logger = require('./logger').logger;

module.exports = async (app) => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_MASTER_SERVICE_HOST || '127.0.0.1',
      port: 6379
    }
  });

  client.on('error', (err) => {
    logger.error(`Connected to Redis Client successfully!`);
    console.log(err);
  });

  client
    .connect()
    .then(() => {
      app['redisClient'] = client;
      logger.info(`Connected to Redis Client successfully!`);
    });

}
