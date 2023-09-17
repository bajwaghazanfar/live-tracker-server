const jwt = require("jsonwebtoken");
exports.adminOnlyCheck = (req, res, next) => {
  const token = req.cookies.token;
  console.log("admin only");
  try {
    var { type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type != "admin") {
      res.status(400).json({
        error: "You do not have access to this resource",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(400).clearCookie("token").json({
      error: "Your session has expired, please relogin",
      path: "/login",
    });
  }
};
