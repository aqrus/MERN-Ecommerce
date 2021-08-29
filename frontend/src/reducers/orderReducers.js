const orderConstans = require('../constant/orderContants');

export const newOrderReducer = (state = {}, action) => {
    
    switch (action.type) {
        case orderConstans.CREATE_ORDER_REQUEST:
            
            return {
                loading: true,
                ...state
            };

        case orderConstans.CREATE_ORDER_SUCCESS:

            return {
                loading: false,
                order: action.payload
            }

        case orderConstans.CREATE_ORDER_FALSE:

            return {
                loading: false,
                error: action.payload
            }

        case orderConstans.CLEAR_ERROR:

            return {
                loading: false,
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const myOrderReducers = (state = { orders: [] }, action) => {

    switch (action.type) {

        case orderConstans.MY_ORDER_REQUEST:
            
            return {
                loading: true,
            };
        
        case orderConstans.MY_ORDER_SUCCESS:

            return {
                loading: false,
                orders: action.payload
            };

        case orderConstans.MY_ORDER_FALSE:
           
            return {
                loading: false,
                error: action.payload
            };

        default:
           return state;

    }
}

export const detailOrderReducers = (state = { order:{}}, action) => {

    switch (action.type) {

        case orderConstans.DETAIL_ORDER_REQUEST:
            
            return {
                loading: true,
            };
        
        case orderConstans.DETAIL_ORDER_SUCCESS:

            return {
                loading: false,
                order: action.payload
            };

        case orderConstans.DETAIL_ORDER_FALSE:
           
            return {
                ...state,
                error: action.payload
            };

        default:
           return state;
    }
}

export const allOrdersReducer = (state={ order:[] }, action) => {

    switch (action.type) {

        case orderConstans.ALL_ORDER_REQUEST:
            
            return {
                loading: true,
            };
        
        case orderConstans.ALL_ORDER_SUCCESS:

            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            };

        case orderConstans.ALL_ORDER_FALSE:
           
            return {
                loading: false,
                error: action.payload
            };
        
        default:
           return state;
    }
}

export const orderReducer = (state={}, action) => {

    switch (action.type) {

        case orderConstans.DELETE_ORDER_REQUEST:
        case orderConstans.UPDATE_ORDER_REQUEST:
            return {
                loading: true,
            };

        case orderConstans.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case orderConstans.DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };

        case orderConstans.DELETE_ORDER_FALSE:
        case orderConstans.UPDATE_ORDER_FALSE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case orderConstans.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            };

        case orderConstans.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            };

        case orderConstans.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
           return state;
    }
}
