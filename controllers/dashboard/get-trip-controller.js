const getTripService = require("../../services/dashboard/getTripService");
const getTrip = async (req, res) => {
  const { id } = req.body;
  const { errors, success, data } = await getTripService(id);
  const paths = data.rows[0].paths;
  const array = [];
  for (let i = 0; i < paths.length; i += 2) {
    // Check if there are at least two elements remaining in the original array
    if (i + 1 < paths.length) {
      // Create a new array with two elements
      const newPath = [paths[i], paths[i + 1]];

      // Push the new array to newPaths
      array.push(newPath);
    }
  }
  const waypoints = array.map((coordinates, index) => ({
    coordinates,
  }));

  data.rows[0].paths = waypoints;
  res.json({
    errors,
    success,
    data,
  });
};
module.exports = getTrip;
