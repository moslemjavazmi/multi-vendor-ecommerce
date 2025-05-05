const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
router.post("/admin-login", authControllers.admin_login);
module.exports = router;
