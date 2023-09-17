const { getUserByEmail } = require("../../db/operations/GET");
const bcrypt = require("bcrypt");
const { createNewUser, updateUserTeamID } = require("../../db/operations/POST");
const jwt = require("jsonwebtoken");
const createJWT = require("../../utils/create-jwt");
const createTeamService = require("../dashboard/createTeamService");

const signUpService = async (name, email, password, type) => {
  const user = await getUserByEmail(email);
  if (user.rows.length > 0) {
    return {
      errors: "A user with that email already exists",
      success: false,
    };
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createNewUser(name, email, hashedPassword, type);
  const newTeam = await createTeamService(
    newUser.rows[0].userid.trim(),
    `${newUser.rows[0].name.trim()}'s Team`
  );
  await updateUserTeamID(
    newTeam.data.rows[0].id,
    newUser.rows[0].userid.trim()
  );

  const token = await createJWT(
    newUser.rows[0].userid.trim(),
    newUser.rows[0].name.trim(),
    newUser.rows[0].type.trim(),
    newTeam.data.rows[0].id
  );

  return {
    errors: null,
    success: true,
    data: token,
  };
};

module.exports = signUpService;
