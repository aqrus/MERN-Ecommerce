import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";

let intinialState = {};
const middleware = [thunk];
const store = createStore(
    reducers,
    intinialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store