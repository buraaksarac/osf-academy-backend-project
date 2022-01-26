var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { secretKey } = require("../../public/javascripts/secretKey");
const { endPoints } = require("../../public/javascripts/endPoints");

/* GET home page. */
router.get("/:category", async function (req, res, next) {
  const paramStyle1 = req.params.category + "?" + `secretKey=${secretKey}`;
  const paramStyle2 = req.params.category + "&" + `secretKey=${secretKey}`;
  let main = "";
  let sub = "";
  let count = 0;

  req.params.category.split("").forEach((letter) => {
    count = letter === "-" ? count + 1 : count;
  });

  main =
    count < 2
      ? endPoints.mainCategory + paramStyle1
      : endPoints.productList + paramStyle2;
  sub = endPoints.subCategory + paramStyle1;

  const mainResponse = await fetch(main).then((response) => response.json());
  const subResponse = await fetch(sub).then((response) => response.json());

  count < 2
    ? res.render("categories/index", {
        title: "Alibazon - " + mainResponse.page_title,
        data: mainResponse,
        subcategories: subResponse,
      })
    : res.render("product/productList", {
        products: mainResponse,
      });
});

module.exports = router;
