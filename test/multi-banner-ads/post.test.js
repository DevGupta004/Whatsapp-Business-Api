const { MultiBannerAdsSchema } = require("../../models/multi-banner-ads");
const { UnitTester } = require("@mogi/express-tester");
const payload = require("./data.json");

UnitTester.init(require("../../app"), require("./test.config.json"));

describe("Test for POST calls for /multi-banner-ads/", () => {
  describe("POST /multi-banner-ads/", () => {
    let _id = null;
    it("1. Create a multibanner-ad (Non-existent)", (done) => {
      UnitTester.post("/multi-banner-ads/", payload)
        .then((response) => {
          _id = response.data._id;
          UnitTester.validateStatus(response, {
            code: 201,
            message: "created",
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

  describe("POST /multi-banner-ads/", () => {
    let _id = null;
    it("2. Create a multibanner-ad (Existent)", (done) => {
      /**For creating initial record */
      UnitTester.post("/multi-banner-ads/", payload)
        .then((response) => {
          /**For creating duplicate record */
          UnitTester.post("/multi-banner-ads/", payload)
            .then((response) => {
              UnitTester.validateStatus(response, {
                code: 400,
                message: "Multi banner ad with this name already exists",
              });
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        })
        .finally(() => {
          UnitTester.deleteResource(_id, MultiBannerAdsSchema);
        });
    });
  });
}); //
