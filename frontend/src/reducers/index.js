import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { myOrderReducers, newOrderReducer, detailOrderReducers } from "./orderReducers";
import { productsReducers, productDetailReducer, newReviewsReducer } from "./productReducers";
import { authReducers, userReducers, forgotPasswordReducer } from "./userReducers";


const reducers = combineReducers({
    products: productsReducers,
    product: productDetailReducer,
    auth: authReducers,
    user: userReducers,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducers,
    detailOrder: detailOrderReducers,
    newReviews: newReviewsReducer
})

export default reducers