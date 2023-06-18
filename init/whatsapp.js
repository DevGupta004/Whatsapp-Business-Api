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

    // Send text message
    // const result = await bot.sendText(to, 'Hello world');

    // Start express server to listen for incoming messages
    // NOTE: See below under `Documentation/Tutorial` to learn how
    // you can verify the webhook URL and make the server publicly available
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
