var createError = require("http-errors");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var productRouter = require("./routes/productDetail/product");
var signInRouter = require("./routes/auth/signIn");
var signUpRouter = require("./routes/auth/signUp");
var categoryRouter = require("./routes/categories/index");
var cartRouter = require("./routes/cart-wishlist/cart");
var wishlistRouter = require("./routes/cart-wishlist/wishlist");
var profileRouter = require("./routes/auth/profile");

var app = express();

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app,
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
app.use("/profile", profileRouter);
app.use("/categories", categoryRouter);
app.use(cartRouter);
app.use("/wishlist", wishlistRouter);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

/* Set default page (Home page) as men-clothing page  */
app.get("/", function rootHandler(req, res) {
  res.redirect("/categories/mens");
});

// catch 404 and forward to error handler
app.use(Sentry.Handlers.errorHandler());

// error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "");
});

module.exports = app;
