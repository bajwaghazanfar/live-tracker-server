const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const pool = require("../../pool");

const createNewUser = async (name, email, password, type, teamID) => {
  const text =
    "INSERT INTO users (userid, name, email, password, type, teamid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [uuidv4(), name, email, password, type, teamID];

  const res = await pool.query(text, values);

  return res;
};
const updateUserTeamID = async (teamid, userid) => {
  console.log(teamid, userid);
  const text = "UPDATE users SET teamid = $1 WHERE userid = $2 RETURNING *";
  const values = [teamid, userid];

  const res = await pool.query(text, values);

  return res;
};
const addTripToUser = async (userID, tripID) => {
  const text = "UPDATE users SET trips = $1 WHERE userid = $2 RETURNING *";
  const values = [tripID, userID];

  const res = await pool.query(text, values);

  return res;
};
const createNewTeam = async (adminID, teamName) => {
  const text =
    "INSERT INTO teams (adminid,teamname) VALUES($1 , $2) RETURNING *";
  const values = [adminID, teamName];

  const res = await pool.query(text, values);

  return res;
};
const addCourierToTeam = async (userID, teamID) => {
  const text =
    "UPDATE teams SET couriers = ARRAY_APPEND(couriers, $1) WHERE id = $2 RETURNING *";
  const values = [userID, teamID];

  const res = await pool.query(text, values);

  return res;
};
const addTripToTeam = async (trip_id, teamID) => {
  const text =
    "UPDATE teams SET trips = ARRAY_APPEND(trips, $1) WHERE id = $2 RETURNING *";
  const values = [trip_id, teamID];

  const res = await pool.query(text, values);

  return res;
};

const createTrip = async (
  start,
  end,
  asignee,
  tripname,
  start_name,
  end_name,
  vehicle
) => {
  const text =
    "INSERT INTO trips (start_coordinate,end_coordinate,asignee,tripname,start_name,end_name,vehicle,trip_id,paths) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
  const values = [
    `{${start[0]},${start[1]}}`,
    `{${end[0]},${end[1]}}`,
    asignee,
    tripname,
    start_name,
    end_name,
    vehicle,
    uuidv4(),
    `{${start[0]},${start[1]}}`,
  ];
  const res = await pool.query(text, values);

  return res;
};
const updateTripPath = async (tripID, coordinates) => {
  console.log(coordinates[0], coordinates[1]);
  const text =
    "UPDATE trips SET paths = array_cat(paths, $1) WHERE trip_id = $2 RETURNING *";
  const values = [coordinates, tripID]; // Changed this line

  const res = await pool.query(text, values);

  return res;
};

module.exports = {
  createNewUser,
  createNewTeam,
  addTripToUser,
  addCourierToTeam,
  addTripToTeam,
  updateUserTeamID,
  createTrip,
  updateTripPath,
};
