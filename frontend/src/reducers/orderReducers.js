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