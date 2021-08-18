const express = require("express");
const productControllers = require("../controllers/productController");
const productRouter = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

productRouter.post('/seed',productControllers.seedProduct);

productRouter.put('/review', isAuthenticatedUser, productControllers.createProductReviews);
productRouter.delete('/review', isAuthenticatedUser, productControllers.deleteProductReview);
productRouter.get('/review/:id', isAuthenticatedUser, productControllers.getProductReviews);

productRouter.post('/admin/new', isAuthenticatedUser, authorizeRoles('admin'), productControllers.newProduct);
productRouter.put('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), productControllers.updateProduct);
productRouter.delete('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), productControllers.deleteProduct);

productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/:id', productControllers.getProduct);

module.exports = productRouter;