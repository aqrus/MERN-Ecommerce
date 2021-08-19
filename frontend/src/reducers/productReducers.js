const productConstants = require('../constant/producConstants');

const productsReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.PRODUCTS_LIST_REQUEST:
           return {
               loading : true,
               products: []
           }

        case productConstants.PRODUCTS_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case productConstants.PRODUCTS_LIST_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export {
    productsReducers
}