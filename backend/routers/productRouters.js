const express = require("express");
const productControllers = require("../controllers/productController");
const productRouter = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

productRouter.post('/seed',productControllers.seedProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/:id', productControllers.getProduct);
productRouter.post('/admin/new', isAuthenticatedUser, authorizeRoles('admin'), productControllers.newProduct);
productRouter.put('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), productControllers.updateProduct);
productRouter.delete('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), productControllers.deleteProduct);

module.exports = productRouter;