const { getTripByID } = require("../../db/operations/GET");

const getTripService = async (id) => {
  const trip = await getTripByID(id);

  return {
    errors: null,
    success: true,
    data: trip,
  };
};

module.exports = getTripService;
