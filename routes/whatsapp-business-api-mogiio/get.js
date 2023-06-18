const {WhatsAppBusinessApi} = require('../../classes/multi-banner-ads');
const {isValidObjectId} = require('../../lib/object-id');

const getMultiBannerAds = async (req, res, next) => {
  try {
     const response = await new WhatsAppBusinessApi(req.userData.wacId).getAll();
     return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getMultiBannerAd = async (req, res, next) => {
  try {
    if (isValidObjectId(req.params.id)) {
      const response = await new WhatsAppBusinessApi(req.userData.wacId).getById(req.params.id);
      return res.status(200).json(response);
    } else {
      throw new Error('invalid multi-banner-ad id');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {getMultiBannerAds, getMultiBannerAd};
