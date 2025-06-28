//backend/routes/authRoutes.js
const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const categoryController = require("../../middlewares/categoryController");
router.post("/category-add", authMiddleware, categoryController.add_category);
router.get("/category-add", authMiddleware, categoryController.get_category);
module.exports = router;
