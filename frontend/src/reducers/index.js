import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { myOrderReducers, newOrderReducer, detailOrderReducers, allOrdersReducer, orderReducer } from "./orderReducers";
import { productsReducers, productDetailReducer, newReviewsReducer, newProductReducer, productReducers, productReviewsReducer, reviewReducer } from "./productReducers";
import { authReducers, userReducers, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./userReducers";


const reducers = combineReducers({
    products: productsReducers,
    productDetail: productDetailReducer,
    product: productReducers,
    auth: authReducers,
    user: userReducers,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducers,
    detailOrder: detailOrderReducers,
    newReviews: newReviewsReducer,
    newProduct: newProductReducer,
    allOrders:  allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
})

export default reducers