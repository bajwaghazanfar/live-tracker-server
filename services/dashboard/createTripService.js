const { createTrip } = require("../../db/operations/POST");
const { addTripToTeam, addTripToUser } = require("../../db/operations/POST");
const createTripService = async (
  start,
  end,
  asignee,
  tripname,
  start_name,
  end_name,
  vehicle,
  team_id
) => {
  const trip = await createTrip(
    start,
    end,
    asignee,
    tripname,
    start_name,
    end_name,
    vehicle
  );
  const tripID = trip.rows[0].trip_id;

  await addTripToTeam(tripID, team_id);
  await addTripToUser(asignee, tripID);

  return {
    errors: null,
    success: true,
    data: trip,
  };
};

module.exports = createTripService;
