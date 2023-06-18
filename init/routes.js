const express = require('express');
const morgan = require('morgan');
const error = require('../middleware/error');

const multiBannerAds = require('../routes/whatsapp-business-api-mogiio');
const whatsapp = require('./whatsapp');

module.exports = function(app) {
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use('/whatsapp-business-api-mogiio', multiBannerAds);
  app.use('/whatsapp-business-api', whatsapp);
  app.use(error);
}
