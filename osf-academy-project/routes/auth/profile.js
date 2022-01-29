var express = require("express");
var router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { isLogged } = require("../../services/checkAuth/isLogged");

router.get("/", function (req, res, next) {
  let auth = isLogged(req);

  res.render("auth/profile", {
    title: "Alibazon - Profile",
    auth: auth,
    user: auth.user,
  });
});

module.exports = router;
