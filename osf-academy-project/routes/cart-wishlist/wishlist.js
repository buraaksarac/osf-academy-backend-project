var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { secretKey } = require("../../services/config/secretKey");
const { endPoints } = require("../../services/config/endPoints");
const { isLogged } = require("../../services/checkAuth/isLogged");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("cart-wishlist/wishlist", {
    title: "Alibazon",
    auth: isLogged(req),
  });
});

module.exports = router;
