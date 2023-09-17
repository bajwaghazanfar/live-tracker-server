const { updateTripPath } = require("../../db/operations/POST");

const updateTripService = async (tripID, coordinates) => {
  const trip = await updateTripPath(tripID, coordinates);

  return {
    errors: null,
    success: true,
    data: trip,
  };
};

module.exports = updateTripService;
