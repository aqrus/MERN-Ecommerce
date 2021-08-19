import { combineReducers } from "redux";
import { productsReducers } from "./productReducers";

const reducers = combineReducers({
    products: productsReducers
})

export default reducers