const { getUserByID } = require("../../db/operations/GET");

const getCurrentUserService = async (uuid) => {
  const user = await getUserByID(email);

  return {
    errors: null,
    success: true,
    data: token,
  };
};

module.exports = getCurrentUserService;
