const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const productController = require("../../controllers/dashboard/productController");

router.post("/product-add", authMiddleware, productController.add_product);
router.get("/get-products", authMiddleware, productController.get_products);
router.get(
  "/product-get/:productId",
  authMiddleware,
  productController.get_product
);
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);

module.exports = router;
