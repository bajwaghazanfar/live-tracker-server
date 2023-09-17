const getTeamService = require("../../services/dashboard/getTeamService");

const getTeam = async (req, res) => {
  const { id } = req.body;
  const { errors, success, data } = await getTeamService(id);
  res.json({
    errors,
    success,
    data,
  });
};
module.exports = getTeam;
