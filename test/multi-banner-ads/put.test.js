const { MultiBannerAdsSchema } = require("../../models/multi-banner-ads");
const { UnitTester } = require("@mogi/express-tester");
const payload = require("./data.json");

UnitTester.init(require("../../app"), require("./test.config.json"));

describe("Test for PUT calls for /multi-banner-ads/", () => {
  describe("PUT /multi-banner-ads/:id", () => {
    let _id = null;
    it("1. Updating mutlibanner add", (done) => {
      UnitTester.post("/multi-banner-ads/", payload)
        .then((response) => {
          _id = response.data._id;
          return UnitTester.put(`/multi-banner-ads/${_id}`);
        })
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 201,
            message: "updated",
          });
          done();
        })
        .catch((error) => {
          done(error);
        })
        .finally(() => {
          UnitTester.deleteResource(_id, MultiBannerAdsSchema)
        });
    });
  });
  
  describe("PUT /multi-banner-ads/:id", () => {
    let _id = null;
    it("3. Updating mutlibanner add using (INVALID ID)", (done) => {
      UnitTester.post("/multi-banner-ads/", payload)
        .then((response) => {
          _id = response.data.ads._id;
          return UnitTester.put(`/multi-banner-ads/invalid-id`);
        })
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 400,
            message: "invalid multi banner ad id",
          });
          done();
        })
        .catch((error) => {
          done(error);
        })
        .finally(() => {
          UnitTester.deleteResource(_id, MultiBannerAdsSchema);
        });
    });
  });

});
