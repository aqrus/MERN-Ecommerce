import cartConstants from '../constant/cartConstants'
import axios from 'axios';

export const addToCart = (productId, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
        type: cartConstants.ADD_TO_CART,
        payload: {
            name: data.name,
            quantity: quantity,
            price: data.price,
            image: data.images[0].url,
            product: data._id
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeCartItems = (productId) => (dispatch, getState) => {

    dispatch({
        type: cartConstants.REMOVE_CART_ITEM,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}