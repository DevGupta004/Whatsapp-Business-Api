const mongoose = require('mongoose');
const logger = require('./logger').logger;

module.exports = () => {

  const dbUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/whatsapp-business-api-mogiio';


  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },() => {
    logger.info(`Connected to MongoDB URL: ${process.env.MONGO_DB_URL}`)
    console.log(`Connected to MongoDB URL: ${dbUrl}`)
  });

}
