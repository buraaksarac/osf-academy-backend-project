module.exports.isLogged = function (req) {
  return typeof req.cookies.auth != "undefined" ? req.cookies.auth : false;
};
