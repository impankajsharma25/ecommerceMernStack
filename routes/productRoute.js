const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productControllers");
const { isAuthenticatedUser, authoizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/product").get(getAllProduct);
router.route("/products").get( getAllProducts);

router.route("/products/new").post(isAuthenticatedUser, authoizeRoles("admin") , createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, authoizeRoles("admin") , updateProduct)
  .delete(isAuthenticatedUser, authoizeRoles("admin") , deleteProduct)
  .get(getProductDetails);

// router.route("/products/:id").delete(deleteProduct)

module.exports = router;
