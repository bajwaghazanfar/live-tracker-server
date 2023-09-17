const createCourierService = require("../../services/dashboard/createCourierService");

const createCourier = async (req, res) => {
  const { name, email, type, teamID } = req.body;

  const { errors, success, data } = await createCourierService(
    name,
    email,
    type,
    teamID
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
module.exports = createCourier;
