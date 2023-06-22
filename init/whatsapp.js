const express = require('express');
const morgan = require('morgan');
const error = require('../middleware/error');
// import { createBot } from 'whatsapp-cloud-api';
// or if using require:
const { createBot } = require('whatsapp-cloud-api');



(async () => {
  try {
    // replace the values below from the values you copied above
    const from = process.env.PHONE_NUMBER_ID;
    const token =process.env.ACCESS_TOKEN;
    const to = process.env.RECIPIENT_WAID; // your phone number without the leading '+'
    const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN; // use a random value, e.g. 'bju#hfre@iu!e87328eiekjnfw'

    // Create a bot that can send messages
    const bot = createBot(from, token);

   
    await bot.startExpressServer({
        webhookVerifyToken: webhookVerifyToken,
        port: 3000,
        webhookPath: `/mogiio-whatsapp/webhook`,
      });

    // Listen to ALL incoming messages
    // NOTE: remember to always run: await bot.startExpressServer() first
    bot.on('message', async (msg) => {
      console.log(msg);

      if (msg.type === 'text') {
        await bot.sendText(msg.from, 'Received your text message!');
      } else if (msg.type === 'image') {
        await bot.sendText(msg.from, 'Received your image!');
      }
    });

    bot.on('event', async (event) => {
      console.log("event", event);
    })
  } catch (err) {
    console.log(err);
  }
})();


module.exports = function(app) {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/whatsapp-business-api-mogiio', multiBannerAds);
    app.use(bot);
    app.use(error);
  }
