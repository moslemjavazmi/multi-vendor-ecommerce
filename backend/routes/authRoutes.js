//backend/routes/authRoutes.js
const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const authControllers = require("../controllers/authControllers");
router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/seller-register", authControllers.seller_register);

module.exports = router;
