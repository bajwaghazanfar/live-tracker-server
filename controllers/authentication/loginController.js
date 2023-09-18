const loginService = require("../../services/auth/loginService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { errors, success, data } = await loginService(email, password);

  res
    .status(200)
    .cookie("token", data, {
      sameSite: "strict",
      path: "/",
      maxAge: 9000000,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      errors,
      success,
      data,
    });
};
module.exports = loginController;
