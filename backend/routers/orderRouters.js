const express = require('express');
const router = express.Router();

const order = require('../controllers/orderControllers');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/new').post(isAuthenticatedUser, order.newOrder);
router.route('/me').get(isAuthenticatedUser, order.myOrder);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), order.allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), order.updateOrders)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), order.deleteOrders);
router.route('/:id').get(isAuthenticatedUser, order.getSingleOrder);

module.exports = router;