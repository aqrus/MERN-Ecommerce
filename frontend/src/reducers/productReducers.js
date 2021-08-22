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
                products: action.payload.products,
                page: action.payload.page,
                totalPages: action.payload.totalPages
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

const productDetailReducer = (state = { product:{} }, action) => {

    switch (action.type) {
        case productConstants.PRODUCTS_DETAIL_REQUEST:
            return {
                loading: true,
                product: {}
            }
        
        case productConstants.PRODUCTS_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case productConstants.PRODUCTS_DETAIL_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export {
    productsReducers,
    productDetailReducer
}