const createCourier = require("../controllers/dashboard/create-courier-controller");
const createTeam = require("../controllers/dashboard/create-team-controller");
const createTrip = require("../controllers/dashboard/create-trip-controller");
const getAllCouriers = require("../controllers/dashboard/get-all-couriers-controller");
const getCurrentUser = require("../controllers/dashboard/get-current-user-controller");
const getTeam = require("../controllers/dashboard/get-team-controller");
const getTrip = require("../controllers/dashboard/get-trip-controller");
const updateTrip = require("../controllers/dashboard/update-trip-controller");
const assignTrip = require("../controllers/dashboard/assign-trip-controller");
const { adminOnlyCheck } = require("../middleware/admin-only");
const router = require("express").Router();

router.post("/add-courier", adminOnlyCheck, createCourier);
router.post("/create-team", adminOnlyCheck, createTeam);
router.post("/create-trip", adminOnlyCheck, createTrip);
router.post("/update-trip", adminOnlyCheck, updateTrip);
router.post("/assign-trip", adminOnlyCheck, assignTrip);
router.get("/get-couriers", adminOnlyCheck, getAllCouriers);
router.get("/get-trip", adminOnlyCheck, getTrip);
router.post("/get-team", getTeam);
router.get("/get-current-user", getCurrentUser);

module.exports = router;
