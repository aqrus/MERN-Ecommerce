const express = require("express");
const productControllers = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get('/products', productControllers.getProducts);

module.exports = productRouter;