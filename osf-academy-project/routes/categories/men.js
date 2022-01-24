var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var secretKey = require("../../public/javascripts/secretKey.js");

const mainCategoryURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens?secretKey=${secretKey}`;
const subcategoryURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens?secretKey=${secretKey}`;
const mainClothingURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens-clothing?secretKey=${secretKey}`;
const subClothingURL = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens-clothing?secretKey=${secretKey}`;

/* GET home page. */
router.get("/categories/mens", async function (req, res, next) {
  const mainCategoryResponse = await fetch(mainCategoryURL).then((response) =>
    response.json()
  );
  const subcategoryResponse = await fetch(subcategoryURL).then((response) =>
    response.json()
  );
  // console.log(subcategoryResponse);
  // res.send("tagId is set to aloo");

  res.render("categories/men", {
    title: "Alibazon - " + mainCategoryResponse.page_title,
    data: mainCategoryResponse,
    subcategories: subcategoryResponse,
  });
});

router.get("/categories/mens-clothing", async function (req, res, next) {
  const mainResponse = await fetch(mainClothingURL).then((response) =>
    response.json()
  );
  const subResponse = await fetch(subClothingURL).then((response) =>
    response.json()
  );
  console.log(subResponse);

  res.render("categories/men", {
    title: "Alibazon",
    data: mainResponse,
    subcategories: subResponse,
  });
});

router.get(
  "/categories/mens-clothing-jackets",
  async function (req, res, next) {
    const url = `https://osf-digital-backend-academy.herokuapp.com/api//products/product_search?primary_category_id=mens-clothing-jackets&secretKey=${secretKey}`;
    const response = await fetch(url).then((data) => data.json());
    res.render("categories/productsPage", {
      products: response,
    });
  }
);

router.get(
  "/categories/mens-clothing-jackets/product/:product",
  async function (req, res, next) {
    const url = `https://osf-digital-backend-academy.herokuapp.com/api//products/product_search?id=${req.params.product}&secretKey=${secretKey}`;
    const response = await fetch(url).then((data) => data.json());
    res.render("categories/product", { product: response[0] });
  }
);

router.get(
  "/categories/mens-clothing-dress-shirts",
  async function (req, res, next) {
    const mainUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens-clothing-dress-shirts?secretKey=${secretKey}`;
    const subUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens-clothing-dress-shirts?secretKey=${secretKey}`;

    const mainResponse = await fetch(mainUrl).then((response) =>
      response.json()
    );
    const subResponse = await fetch(subUrl).then((response) => response.json());
    res.send("Geldi");

    /*     res.render("categories/men", {
      title: "Alibazon",
      data: mainResponse,
      subcategories: subResponse,
    }); */
  }
);
router.get("/categories/mens-clothing-suits", async function (req, res, next) {
  const mainUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens-clothing-suits?secretKey=${secretKey}`;
  const subUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens-clothing-suits?secretKey=${secretKey}`;

  const mainResponse = await fetch(mainUrl).then((response) => response.json());
  const subResponse = await fetch(subUrl).then((response) => response.json());
  res.send("Geldi");

  /*   res.render("categories/men", {
    title: "Alibazon",
    data: mainResponse,
    subcategories: subResponse,
  }); */
});
router.get("/categories/mens-clothing-shorts", async function (req, res, next) {
  const mainUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens-clothing-shorts?secretKey=${secretKey}`;
  const subUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens-clothing-shorts?secretKey=${secretKey}`;

  const mainResponse = await fetch(mainUrl).then((response) => response.json());
  const subResponse = await fetch(subUrl).then((response) => response.json());
  res.send("Geldi");

  /*   res.render("categories/men", {
    title: "Alibazon",
    data: mainResponse,
    subcategories: subResponse,
  }); */
});
router.get("/categories/mens-clothing-pants", async function (req, res, next) {
  const mainUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/parent/mens-clothing-pants?secretKey=${secretKey}`;
  const subUrl = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens-clothing-pants?secretKey=${secretKey}`;

  const mainResponse = await fetch(mainUrl).then((response) => response.json());
  const subResponse = await fetch(subUrl).then((response) => response.json());

  res.send("Geldi");
  /*  res.render("categories/men", {
    title: "Alibazon",
    data: mainResponse,
    subcategories: subResponse,
  }); */
});

module.exports = router;
