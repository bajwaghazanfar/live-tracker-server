const { getUserByEmail } = require("../../db/operations/GET");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createJWT = require("../../utils/create-jwt");
const loginService = async (email, password) => {
  const user = await getUserByEmail(email);

  if (user.rows.length === 0) {
    return {
      errors: "A user with that email does not exist",
      success: false,
    };
  }
  const isMatch = await bcrypt.compare(password, user.rows[0].password.trim());

  const token = await createJWT(
    user.rows[0].userid.trim(),
    user.rows[0].name.trim(),
    user.rows[0].type.trim(),
    user.rows[0].teamid,
    user.rows[0].trips
  );
  if (!isMatch) {
    return {
      errors: "Invalid Password",
      success: false,
      data: null,
    };
  }
  return {
    errors: null,
    success: true,
    data: token,
  };
};

module.exports = loginService;
