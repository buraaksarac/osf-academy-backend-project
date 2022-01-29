var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { secretKey } = require("../../services/config/secretKey");
const { endPoints } = require("../../services/config/endPoints");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("cart-wishlist/cart", { title: "Alibazon" });
});

module.exports = router;
