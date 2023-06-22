const {isValidObjectId} = require("../../lib/object-id");
const {WhatsAppBusinessApi} = require("../../classes/multi-banner-ads");

const updateMultiBannerAd = async (req, res, next) => {
  console.log("Update multi-banner", req);

  try {
    if (isValidObjectId(req.params.id)) {
      const whatsAppBusinessApi = new WhatsAppBusinessApi(req.userData.wacId);
      const exists = await whatsAppBusinessApi.exists(
        [{name: req.body.name}],
        req.params.id
      );

      if (exists) {
        throw new Error('WhatsAppBusinessApi with this name already exists');
      } else {

        if (req.body.sendMessage && req.body.isTemplete) {
          const sendWhatsappMessage = new WhatsAppBusinessApi;
          const sendMsg = sendWhatsappMessage.sendWhatsappMessage(req.body.waNumber, req.body.text, req.body.isTemplete)
        } else if (req.body.sendMessage) {
          const sendWhatsappMessage = new WhatsAppBusinessApi;
          const sendMsg = sendWhatsappMessage.sendWhatsappMessage(req.body.waNumber, req.body.text)
        }

        const response = await new WhatsAppBusinessApi(req.userData.wacId).update(
          {...req.body},
          req.params.id
        );

        return res.status(response.status.code).json(response);
      }
    } else {
      throw new Error('invalid multi banner ad id');
    }
  } catch (e) {
    next(e);
  }
};


module.exports = {
  updateMultiBannerAd,
};
