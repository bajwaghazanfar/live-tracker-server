const { getUserByEmail } = require("../../db/operations/GET");
const signUpService = require("../../services/auth/signUpService");
const createTeamService = require("../../services/dashboard/createTeamService");
const checkStatus = require("../../validators/checkStatus.");
const validatePassword = require("../../validators/valdiatePassword");
const validateEmail = require("../../validators/validateEmail");

const signUpController = async (req, res) => {
  const { name, email, password, type } = req.body;

  const validation = checkStatus(
    validateEmail(email),
    validatePassword(password, 6)
  );

  if (!validation) {
    return res.status(400).json({
      errors: "error",
      success: false,
    });
  }
  const { errors, success, data } = await signUpService(
    name,
    email,
    password,
    type
  );

  res
    .status(200)
    .cookie("token", data, {
      sameSite: "strict",
      path: "/",
      maxAge: 900000,
      httpOnly: false,
    })
    .json({
      errors,
      success,
      data,
    });
};
module.exports = signUpController;
