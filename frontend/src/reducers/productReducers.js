const productConstants = require('../constant/productConstants');

const productsReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants.PRODUCTS_LIST_REQUEST:
        case productConstants.PRODUCTS_LIST_ADMIN_REQUEST:
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

        case productConstants.PRODUCTS_LIST_ADMIN_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }

        case productConstants.PRODUCTS_LIST_FALSE:
        case productConstants.PRODUCTS_LIST_ADMIN_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}

const productReducers = (state = {}, action) => {
    switch (action.type) {
        case productConstants.PRODUCTS_DELETE_REQUEST:
        case productConstants.PRODUCTS_UPDATE_REQUEST:
           return {
               ...state,
               loading : true,
           }

        case productConstants.PRODUCTS_DELETE_SUCCESS:
        return {
            ...state,
            loading: false,
            isDelete: action.payload,
        }
        
        case productConstants.PRODUCTS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
    
        case productConstants.PRODUCTS_DELETE_FALSE:
        case productConstants.PRODUCTS_UPDATE_FALSE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case productConstants.PRODUCTS_DELETE_RESET:
            return {
                ...state,
                loading: false,
                isDelete: false,
            }
        case productConstants.PRODUCTS_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            }
        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

const productDetailReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case productConstants.PRODUCTS_DETAIL_REQUEST:
            return {
                product: {},
                loading: true,
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

        case productConstants.CLEAR_ERRORS:
            return {
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

const newReviewsReducer = (state = {}, action) => {

    switch (action.type) {
        case productConstants.PRODUCTS_REVIEW_REQUEST:
            return {
                loading: true,
            }
        
        case productConstants.PRODUCTS_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case productConstants.PRODUCTS_REVIEW_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        case productConstants.PRODUCTS_REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

const newProductReducer = (state = {product: {}}, action) => {

    switch (action.type) {
        case productConstants.PRODUCTS_NEW_REQUEST:
            return {
                loading: true,
            }
        
        case productConstants.PRODUCTS_NEW_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case productConstants.PRODUCTS_NEW_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        case productConstants.PRODUCTS_NEW_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

const productReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case productConstants.PRODUCTS_REVIEW_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case productConstants.PRODUCTS_REVIEW_GET_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case productConstants.PRODUCTS_REVIEW_GET_FALSE:
            return {
                ...state,
                error: action.payload
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case productConstants.PRODUCTS_REVIEW_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case productConstants.PRODUCTS_REVIEW_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case productConstants.PRODUCTS_REVIEW_DELETE_FALSE:
            return {
                ...state,
                error: action.payload
            }

        case productConstants.PRODUCTS_REVIEW_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case productConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
export {
    productsReducers,
    productDetailReducer,
    newReviewsReducer,
    newProductReducer,
    productReducers,
    productReviewsReducer,
    reviewReducer
}