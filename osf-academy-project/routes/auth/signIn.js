var express = require("express");
var router = express.Router();
var secretKey = require("../../public/javascripts/secretKey");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", function (req, res, next) {
  res.render("auth/signIn");
});

router.post(
  "/",
  urlencodedParser,
  [
    check("email", "Email is not valid").not().isEmpty(),
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

      if (!errors.isEmpty()) {
        const alertForResponse = [];
        res.render("auth/signIn", { alertForValidity, alertForResponse });
      } else {
        const alertForResponse = alerts;
        res.render("auth/signIn", { alertForValidity, alertForResponse });
      }
    } else {
      res.json(responseFromAPI);
    }
  }
);

module.exports = router;
