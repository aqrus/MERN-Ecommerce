const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(auth.registerUser);
router.route('/login').post(auth.loginUser);
router.route('/logout').get(auth.logoutUser);

router.route('/me').get(isAuthenticatedUser, auth.getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, auth.updateUserProfile);

router.route('/password/forgot').post(auth.forgotPassword);
router.route('/password/update').put(isAuthenticatedUser, auth.updatePassword);
router.route('/password/reset/:token').put(auth.resetPassword);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), auth.getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), auth.getUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), auth.updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), auth.deleteUser)

module.exports = router;