import { addToCart, removeCartItems, saveShippingInfo } from './cartActions';
import { createOrder } from './orderActions';
import { getProducts, getProductDetails } from './productActions';
import { userLogin, userRegister, loadUser, logoutUser, updateProfile, updatePassword, clearError, forgotPassword, resetPassword } from './userActions'
const actions = {
    getProducts,
    getProductDetails,
    userLogin,
    userRegister,
    loadUser,
    logoutUser,
    updateProfile,
    updatePassword,
    clearError,
    forgotPassword,
    resetPassword,
    addToCart,
    removeCartItems,
    saveShippingInfo,
    createOrder
}

export default actions