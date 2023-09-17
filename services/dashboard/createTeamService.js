const { getUserByID } = require("../../db/operations/GET");
const { createNewTeam } = require("../../db/operations/POST");

const createTeamService = async (adminID, teamName) => {
  const team = await createNewTeam(adminID, teamName);

  return {
    errors: null,
    success: true,
    data: team,
  };
};

module.exports = createTeamService;
