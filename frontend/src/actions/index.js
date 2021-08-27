import { addToCart, removeCartItems, saveShippingInfo, resetCart } from './cartActions';
import { createOrder, myOrders, getOrderDetails } from './orderActions';
import { getProducts, getProductDetails, newReview, getAdminProducts } from './productActions';
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
    resetCart,
    createOrder,
    myOrders,
    getOrderDetails,
    newReview,
    getAdminProducts
    
}

export default actions