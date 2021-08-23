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
    resetPassword
}

export default actions