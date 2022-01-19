var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const secretKey =
  "$2a$08$eJAjg0pwKBepyGB/xKXP8.11w9BwA3rdtAuB0RFXmCL93egouP3.W";
const url = `https://osf-digital-backend-academy.herokuapp.com/api//categories/mens?secretKey=${secretKey}`;

/* GET home page. */
router.get("/", async function (req, res, next) {
  const response = await fetch(url).then((response_from_API) =>
    response_from_API.json()
  );
  console.log(response);
  res.render("categories/men", {
    title: "Alibazon - " + response.page_title,
    data: response,
  });
});

module.exports = router;
