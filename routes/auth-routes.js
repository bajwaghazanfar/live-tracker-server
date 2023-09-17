const router = require("express").Router();
const signUpController = require("../controllers/authentication/signUpController");
const loginController = require("../controllers/authentication/loginController");

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
