var express = require("express");
var router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { secretKey } = require("../../services/config/secretKey");
const { isLogged } = require("../../services/checkAuth/isLogged");

router.get("/", function (req, res, next) {
  res.render("auth/signIn", {
    title: "Sign In",
    auth: isLogged(req),
  });
});
router.get("/logout", function (req, res, next) {
  res.clearCookie("auth");
  res.redirect("/");
});

router.post(
  "/",
  urlencodedParser,
  [
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("password", "Password can not be empty").not().isEmpty(),
  ],
  async (req, res) => {
    let alerts = [];
    req.body.secretKey = secretKey;

    const responseFromAPI = await fetch(
      "https://osf-digital-backend-academy.herokuapp.com/api//auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          alerts.push("User is not found");
        } else {
          alerts.push("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const errors = validationResult(req);

    if (!errors.isEmpty() || alerts.length !== 0) {
      const alertForValidity = errors.array();
      let alertForResponse = !errors.isEmpty() ? [] : alerts;

      res.render("auth/signIn", {
        title: "Sign In",
        alertForValidity,
        alertForResponse,
        auth: req.cookies.auth != "undefined" ? true : false,
      });
    } else {
      res.cookie("auth", responseFromAPI, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.redirect("/profile");
    }
  }
);

module.exports = router;
