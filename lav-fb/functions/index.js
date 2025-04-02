/* eslint-disable */
const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const requestPromise = require("request-promise");

initializeApp();

// must make secret
const CUSTOMER_ID = "hl_09aec81a";
const ZONE_NAME = "serp_api1";
const ZONE_PASS = "gnlmyc4lz0k0";

exports.processProduct = onRequest(async (req, res) => {
  try {
    const name = req.body.name;

    const productData = await requestPromise({
      url: `https://www.google.com/search?q=ps5&tbm=shop&brd_json=1`,
      proxy: `http://brd-customer-${CUSTOMER_ID}-zone-${ZONE_NAME}:${ZONE_PASS}@brd.superproxy.io:33335`,
      strictSSL: false
    });
  
    res.json({
      data: "some stupid data",
      topFive: JSON.parse(productData).shopping.slice(0,5)
    });
  } catch (err) {
    console.error("Failed to load config:", err);
  }
});
