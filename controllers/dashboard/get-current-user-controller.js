const getCurrentUserService = require("../../services/dashboard/getCurrentUserService");

const getCurrentUser = async (req, res) => {
  const { uuid } = req.body;
  const { errors, success, data } = await getCurrentUserService(uuid);
  res.json({
    errors,
    success,
    data,
  });
};
module.exports = getCurrentUser;
