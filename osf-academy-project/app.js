var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var productRouter = require("./routes/productDetail/product");
var signInRouter = require("./routes/auth/signIn");
var signUpRouter = require("./routes/auth/signUp");
var categoryRouter = require("./routes/categories/index");
var cartRouter = require("./routes/cart-wishlist/cart");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories/:parentCategory/product", productRouter);
app.use("/signIn", signInRouter);
app.use("/signUp", signUpRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);

/* Set default page (Home page) as men-clothing page  */
app.get("/", function (req, res) {
  res.redirect("/categories/mens");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
