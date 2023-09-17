const jwt = require("jsonwebtoken");
exports.cookieJwtAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(400).clearCookie("token").json({
      error: "Your session has expired, please relogin",
      path: "/login",
    });
  }
};
