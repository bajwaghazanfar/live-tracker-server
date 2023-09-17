const assignTripService = require("../../services/dashboard/assignTripService");

const assignTripController = async (req, res) => {
  const { tripID, userID } = req.body;

  const { errors, success, data } = await assignTripService(tripID, userID);

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
module.exports = assignTripController;
