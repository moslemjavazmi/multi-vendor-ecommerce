//backend/routes/dashboard/productRoutes.js
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
  "/product-add-images",
  authMiddleware,
  productController.product_add_images
);
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);
router.post(
  "/product-delete-image",
  authMiddleware,
  productController.product_delete_image
);
router.post(
  "/product-update-image",
  authMiddleware,
  productController.product_image_update
);

module.exports = router;
