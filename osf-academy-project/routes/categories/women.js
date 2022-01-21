var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var secretKey = require("../../public/javascripts/secretKey.js");

const mainCategoryURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/womens?secretKey=${secretKey}`;
const subcategoryURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/womens?secretKey=${secretKey}`;

/* GET home page. */
router.get("/", async function (req, res, next) {
  const categoryResponse = await fetch(mainCategoryURL).then((response) =>
    response.json()
  );
  const subcategoryResponse = await fetch(subcategoryURL).then((response) =>
    response.json()
  );

  console.log(categoryResponse);
  console.log(subcategoryResponse);

  res.render("categories/women", {
    title: "Alibazon - " + categoryResponse.page_title,
    data: categoryResponse,
    subcategories: subcategoryResponse,
  });
});

module.exports = router;
