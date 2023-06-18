const { MultiBannerAdsSchema } = require("../../models/multi-banner-ads");
const { UnitTester } = require("@mogi/express-tester");
const payload = require("./data.json");

UnitTester.init(require("../../app"), require("./test.config.json"));

let _id = null;

describe("Test for GET calls for /packages", () => {
  
  describe("GET /multi-banner-ads/", () => {
    it("1. Get all multi-banner-ads (NO-ID)", (done) => {
      UnitTester.get(`/multi-banner-ads/`)
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 200,
            message: "success",
          });
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("GET /multi-banner-ads/", () => {
    it("1. Get one multi-banner-ad using (VALID-ID)", (done) => {
      UnitTester.get(`/multi-banner-ads/6474909f5a75dc5ecffa1cda`)
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 200,
            message: "success",
          });
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("GET /multi-banner-ads/", () => {
    it("1. Get one multi-banner-ad using (INVALID-ID)", (done) => {
      UnitTester.get(`/multi-banner-ads/INVALID-ID`)
        .then((response) => {
          UnitTester.validateStatus(response, {
            code: 400,
            message: "invalid multi-banner-ad id",
          });
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
  
});
