import { addToCart, removeCartItems, saveShippingInfo, resetCart } from './cartActions';
import { createOrder, myOrders, getOrderDetails, allOrders, deleteOrder, updateOrder } from './orderActions';
import { getProducts, getProductDetails, newReview, 
        getAdminProducts, newProduct, deleteProduct, updateProduct,
        getProductReviews, deleteReview
    } from './productActions';
import { userLogin, userRegister, loadUser, logoutUser, 
        updateProfile, updatePassword, clearError, 
        forgotPassword, resetPassword, getUserDetails,
        allUsers, updateUser, deleteUser } from './userActions';
        
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
    getAdminProducts,
    newProduct,
    deleteProduct,
    updateProduct,
    allOrders,
    deleteOrder,
    updateOrder,
    allUsers,
    updateUser,
    deleteUser,
    getUserDetails,
    getProductReviews,
    deleteReview
}

export default actions