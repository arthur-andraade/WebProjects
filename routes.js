const router = require("express").Router();
const auth = require("./middleware/auth");
const validatorLogin = require("./validator/loginValidator");
const LoginController = require("./controller/LoginController");
const SignupController = require('./controller/SignupController');

router.post("/login", validatorLogin, LoginController.signIn);
router.post("/register", SignupController.register);

module.exports = router;