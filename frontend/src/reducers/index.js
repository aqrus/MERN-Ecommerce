import { combineReducers } from "redux";
import { productsReducers, productDetailReducer } from "./productReducers";

const reducers = combineReducers({
    products: productsReducers,
    product: productDetailReducer
})

export default reducers