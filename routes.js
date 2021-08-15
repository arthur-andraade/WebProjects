const router = require("express").Router();
const auth = require("./middleware/auth");
const LoginController = require("./controller/LoginController");

router.post("/login", LoginController.signIn);

module.exports = router;