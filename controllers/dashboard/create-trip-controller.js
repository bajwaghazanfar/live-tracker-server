const createTripService = require("../../services/dashboard/createTripService");

const createTrip = async (req, res) => {
  const {
    start,
    end,
    asignee,
    tripname,
    start_name,
    end_name,
    vehicle,
    team_id,
  } = req.body;
  if (
    start === undefined ||
    end === undefined ||
    asignee === undefined ||
    tripname === undefined ||
    start_name === undefined ||
    end_name === undefined ||
    vehicle === undefined ||
    team_id === undefined
  ) {
    res.status(200).json({
      errors: "Please enter all fields",
      success: false,
      data: null,
    });
  }

  const { errors, success, data } = await createTripService(
    start,
    end,
    asignee,
    tripname,
    start_name,
    end_name,
    vehicle,
    team_id
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
module.exports = createTrip;
