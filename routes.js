const router = require("express").Router();
const auth = require("./middleware/auth");
const validatorLogin = require("./validator/loginValidator");

const LoginController = require("./controller/LoginController");
const SignupController = require('./controller/SignupController');
const PublicationController = require("./controller/PublicationController");

router.post("/login", validatorLogin, LoginController.signIn);
router.post("/register", SignupController.register);
router.post("/makepub", auth, PublicationController.create);

module.exports = router;