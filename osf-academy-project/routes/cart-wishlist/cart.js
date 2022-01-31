var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { secretKey } = require("../../services/config/secretKey");
const { endPoints } = require("../../services/config/endPoints");
const { isLogged } = require("../../services/checkAuth/isLogged");

router.get("/myCart", async function (req, res, next) {
  const getCart = async function () {
    const url = endPoints.cart + "?secretKey=" + secretKey;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged(req).token,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.items)
      .catch((err) => "error:" + err);
  };
  const getProducts = async function (proID) {
    let url = endPoints.product + proID + "&secretKey=" + secretKey;
    return await fetch(url).then((item) => item.json());
  };

  getCart()
    .then(async (IDs) => {
      let products = [];
      if (typeof IDs !== "undefined") {
        for (let item of IDs) {
          await getProducts(item.productId).then((i) => {
            item.product = i[0];
            products.push(item);
          });
        }
        return products;
      } else return [];
    })
    .then((products) => {
      res.render("cart-wishlist/cart", {
        title: "Alibazon",
        auth: isLogged(req),
        cartProducts: products,
      });
    });
});

router.get(
  "/addToCart/:productID/:variantID/:quantity",
  async function (req, res, next) {
    if (isLogged(req)) {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isLogged(req).token,
        },
        body: JSON.stringify({
          secretKey: secretKey,
          productId: req.params.productID,
          variantId: req.params.variantID,
          quantity: req.params.quantity,
        }),
      };
      return await fetch(endPoints.addToCart, options)
        .then((response) => response.json())
        .then((json) => {
          if (!json.error) {
            res.send("Item added to your cart, successfully.");
          } else {
            res.send("Something went wrong. " + json.error);
          }
        })
        .catch((e) => {
          return e;
        });
    } else {
      res.send("You have to be logged in to add item to cart.");
    }
  }
);

router.get(
  "/removeFromCart/:productID/:variantID",
  async function (req, res, next) {
    const url = endPoints.cart + "/removeItem";
    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + isLogged(req).token,
      },
      body: JSON.stringify({
        secretKey: secretKey,
        productId: req.params.productID,
        variantId: req.params.variantID,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          return "Item removed from your cart, successfully.";
        } else {
          throw "Something went wrong: " + json.error;
        }
      })
      .catch((e) => {
        Sentry.captureException(e);
      });
    res.send(result);
  }
);

module.exports = router;
