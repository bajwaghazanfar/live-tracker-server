const {
  getTeamByID,
  getUserByID,
  getTripByID,
} = require("../../db/operations/GET");

const getTeamService = async (id) => {
  const team = await getTeamByID(id);

  if (team.rows[0].couriers === null) {
    return {
      errors: null,
      success: true,
      data: team.rows[0],
    };
  }
  const allCouriersPromise = team.rows[0].couriers.map(async (map, index) => {
    const user = await (await getUserByID(map)).rows[0];

    return user;
  });
  const couriers = await Promise.all(allCouriersPromise).then(function (
    results
  ) {
    return results;
  });

  if (team.rows[0].trips != null) {
    const allTripsPromise = team.rows[0].trips.map(async (map, index) => {
      return await getTripByID(map);
    });
    const trips = await Promise.all(allTripsPromise).then(function (results) {
      return results;
    });
    return {
      errors: null,
      success: true,
      data: {
        id: team.rows[0].id,
        adminid: team.rows[0].adminid,
        teamname: team.rows[0].teamname,
        couriers,
        trips,
      },
    };
  } else {
    return {
      errors: null,
      success: true,
      data: {
        id: team.rows[0].id,
        adminid: team.rows[0].adminid,
        teamname: team.rows[0].teamname,
        couriers,
      },
    };
  }
};

module.exports = getTeamService;
