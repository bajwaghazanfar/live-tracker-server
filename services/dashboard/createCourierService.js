const { getUserByEmail } = require("../../db/operations/GET");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { createNewUser, addCourierToTeam } = require("../../db/operations/POST");
const createCourierService = async (name, email, type, teamID) => {
  const user = await getUserByEmail(email);
  if (user.rows.length > 0) {
    return {
      errors: "A user with that email already exists",
      success: false,
    };
  }
  let hashedPassword = await bcrypt.hash("test", 10);
  const newUser = await createNewUser(
    name,
    email,
    hashedPassword,
    type,
    teamID
  );
  const response = await addCourierToTeam(
    newUser.rows[0].userid.trim(),
    teamID
  );

  return {
    errors: null,
    success: true,
    data: newUser.rows[0],
  };
};

module.exports = createCourierService;
