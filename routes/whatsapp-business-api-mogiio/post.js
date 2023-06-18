const { WhatsAppBusinessApi } = require('../../classes/multi-banner-ads');

const  createMultiBannerAd = async (req, res, next) => {
  try {
    const whatsAppBusinessApi = new WhatsAppBusinessApi(req.userData.wacId, req);


    const currentMultiBannerAdsCount = await whatsAppBusinessApi.getCount({appId: req.userData.wacId});
    const exists = await whatsAppBusinessApi.exists([{ name: req.body.name }]);

    if(exists) {
      throw new Error('Whatsapp Number already exists');
    }

    if (req.body.sendMessage && req.body.isTemplete) {
      const sendWhatsappMessage = new WhatsAppBusinessApi;
      const sendMsg = sendWhatsappMessage.sendWhatsappMessage(req.body.waNumber, req.body.text, req.body.isTemplete)
    } else if (req.body.sendMessage) {
      const sendWhatsappMessage = new WhatsAppBusinessApi;
      const sendMsg = sendWhatsappMessage.sendWhatsappMessage(req.body.waNumber, req.body.text)
    }

    const response = await whatsAppBusinessApi.create({
      ...req.body,
      orderIndex: currentMultiBannerAdsCount + 1,
      userId: req.userData.userId,
      orgId: req.userData.orgId,
      appId: req.userData.wacId,
    });

    return res.status(200).json(response);
  }
  catch (e) {
    next(e);
  }
};

module.exports = { createMultiBannerAd };
