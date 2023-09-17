const updateTripService = require("../../services/dashboard/updateTripService");

const updateTrip = async (req, res) => {
  const { tripID, coordinates } = req.body;

  const { errors, success, data } = await updateTripService(
    tripID,
    coordinates
  );

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
module.exports = updateTrip;
