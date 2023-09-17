const { getUserByID } = require("../../db/operations/GET");
const { addTripToUser } = require("../../db/operations/POST");

const assignTripService = async (tripID, userID) => {
  const user = await getUserByID(userID);
  if (user.trips != null) {
    return {
      errors: "A trip is already assigned to this user",
      success: false,
      data: null,
    };
  } else {
    const trip = await addTripToUser(userID, tripID);
    return {
      errors: null,
      success: true,
      data: trip.rows[0],
    };
  }
};

module.exports = assignTripService;
