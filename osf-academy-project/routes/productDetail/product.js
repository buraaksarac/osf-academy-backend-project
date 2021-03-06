var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { secretKey } = require("../../services/config/secretKey");
const { endPoints } = require("../../services/config/endPoints");
const { isLogged } = require("../../services/checkAuth/isLogged");

/* GET product details page. */
router.get("/:product", async function (req, res, next) {
  const params = req.params.product + "&" + `secretKey=${secretKey}`;
  let url = endPoints.product + params;
  const auth = isLogged(req);

  const response = await fetch(url).then((data) => data.json());

  res.render("product/productDetail", {
    title: response[0].page_title,
    product: response[0],
    auth: auth,
  });
});

module.exports = router;
