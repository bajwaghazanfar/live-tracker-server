const createTeamService = require("../../services/dashboard/createTeamService");

const createTeam = async (req, res) => {
  const { adminID, teamName } = req.body;

  const { errors, success, data } = await createTeamService(adminID, teamName);

  if (errors) {
    res.status(400).json({
      errors,
      success,
      data: null,
    });
  } else {
    res.status(200).json({
      errors,
      success,
      data,
    });
  }
};
module.exports = createTeam;
