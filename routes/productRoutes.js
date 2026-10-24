const express = require("express");
const router = express.Router();

const productController = require("../productController/productController");

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getSingleProduct)
router.post("/", productController.onProductAdd)
router.patch("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)

module.exports = router;