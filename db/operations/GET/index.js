const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const getUserByEmail = async (email) => {
  const query = {
    // give the query a unique name
    name: "fetch-user",
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(query);
  return result;
};
const getUserByID = async (uuid) => {
  const text =
    "SELECT id,userid,name,email,type,teamid,trips FROM users WHERE userid = $1";
  const values = [uuid];

  const result = await pool.query(text, values);
  return result;
};
const getAllUsers = async () => {
  const result = await pool.query("Select * from users");
  return result;
};

const getTeamByID = async (id) => {
  const text = "SELECT * FROM teams WHERE id = $1";
  const values = [id];

  const result = await pool.query(text, values);
  return result;
};

const getTripByID = async (id) => {
  const text = "SELECT * FROM trips WHERE trip_id = $1";
  const values = [id];
  const data = await pool.query(text, values);

  const paths = data.rows[0].paths;
  const array = [];
  if (paths != null) {
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

    return data.rows[0];
  }
};
module.exports = {
  getUserByEmail,
  getAllUsers,
  getUserByID,
  getTeamByID,
  getTripByID,
};
