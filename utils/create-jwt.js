const jwt = require("jsonwebtoken");
const createJWT = async (uuid, name, type, teamID, trips) => {
  const token = await jwt.sign(
    { uuid, name, type, teamID, trips },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
module.exports = createJWT;
