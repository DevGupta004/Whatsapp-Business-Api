const router = require('express').Router( {mergeParams: true} );
const checkAuth = require('../../middleware/check-auth');

const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');


router.get('/', checkAuth,  get.getMultiBannerAds);
router.get('/:id', checkAuth,  get.getMultiBannerAd);
router.post('/', checkAuth,  post.createMultiBannerAd);
router.put('/:id', checkAuth,  put.updateMultiBannerAd);
router.delete('/:id/', checkAuth, del.deleteMultiBannerAd);


module.exports = router;
