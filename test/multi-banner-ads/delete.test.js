const { MultiBannerAdsSchema } = require("../../models/multi-banner-ads");
const { UnitTester } = require("@mogi/express-tester");
const payload = require("./data.json");

UnitTester.init(require("../../app"), require("./test.config.json"));

describe.only("Test for DELETE calls for /multi-banner-ads", () => {
  
  describe("DELETE /multi-banner-ads/:id", () => {
    it("1. Delete a multi-banner-ad with invalid id", (done) => {
      UnitTester.delete(`/multi-banner-ads/invalid-id`)
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
          UnitTester.deleteResource(_id, Package);
        });
    });
  });

  describe("DELETE /multi-banner-ads/:id", () => {
    let _id = null;
    it("2. Delete a multi-banner-ad with valid id", (done) => {
      UnitTester.post("/multi-banner-ads/", payload)
        .then((response) => {
          _id = response.data._id;
          return UnitTester.delete(`/multi-banner-ads/${_id}`);
        })
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 201,
            message: "deleted",
          });
          done();
        })
        .catch((error) => {
          done(error);
        })
        .finally(() => {
          UnitTester.deleteResource(_id, Package);
        });
    });
  });


});
