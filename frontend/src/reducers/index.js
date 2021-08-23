import { combineReducers } from "redux";
import { productsReducers, productDetailReducer } from "./productReducers";
import { authReducers, userReducers, forgotPasswordReducer } from "./userReducers"
const reducers = combineReducers({
    products: productsReducers,
    product: productDetailReducer,
    auth: authReducers,
    user: userReducers,
    forgotPassword: forgotPasswordReducer
})

export default reducers