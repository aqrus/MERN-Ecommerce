import cartConstants from '../constant/cartConstants';

export const cartReducer = (state = { cartItems:[] , shippingInfo:{}, orderInfo:{} }, action) => {

    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.product === item.product);
            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case cartConstants.REMOVE_CART_ITEM:

            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        
        case cartConstants.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        case cartConstants.RESET_CART:
            return {
                cartItems: [],
                shippingInfo:{}, 
                orderInfo:{}
            }    

        default:
            return state
    }

}