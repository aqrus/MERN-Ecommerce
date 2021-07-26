const express = require("express");
const productControllers = require("../controllers/productController");
const productRouter = express.Router();

productRouter.post('/seed', productControllers.seedProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/:id', productControllers.getProduct);
productRouter.post('/admin/new', productControllers.newProduct);
productRouter.put('/admin/:id', productControllers.updateProduct);
productRouter.delete('/admin/:id', productControllers.deleteProduct);


module.exports = productRouter;