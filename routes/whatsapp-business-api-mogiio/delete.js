const {WhatsAppBusinessApi} = require('../../classes/multi-banner-ads');
const {isValidObjectId} = require('../../lib/object-id');

const deleteMultiBannerAd = async (req, res, next) => {
  try {
    if (isValidObjectId(req.params.id)) {
      const response = await new WhatsAppBusinessApi(req.userData.wacId).delete(req.params.id);
      return res.status(200).json(response);
    } else {
      throw new Error('invalid multi banner ad id');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {deleteMultiBannerAd};
