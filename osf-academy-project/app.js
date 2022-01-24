var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var productsRouter = require("./routes/products");
var signInRouter = require("./routes/signIn");
var signUpRouter = require("./routes/signUp");
var menCategoryRouter = require("./routes/categories/men");
var womenCategoryRouter = require("./routes/categories/women");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRouter);
app.use("/signIn", signInRouter);
app.use("/signUp", signUpRouter);
app.use(menCategoryRouter);
app.use("/categories/women", womenCategoryRouter);

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
