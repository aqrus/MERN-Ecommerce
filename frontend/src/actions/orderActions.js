import axios from 'axios';
const orderConstans = require('../constant/orderContants');

export const createOrder = (order) =>async (dispatch, getState) => {

    dispatch({ type: orderConstans.CREATE_ORDER_REQUEST });

    try {

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config);

        dispatch({
            type: orderConstans.CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: orderConstans.CREATE_ORDER_FALSE,
            payload: error.response.data.message
        })

    }
}

export const myOrders = () => async (dispatch, getState) => {

    dispatch({ type: orderConstans.MY_ORDER_REQUEST });

    try {

        const { data } = await axios.get('/api/v1/order/me');

        dispatch({
            type: orderConstans.MY_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: orderConstans.MY_ORDER_FALSE,
            payload: error.response
        })

    }
}

export const getOrderDetails = (orderId) => async (dispatch) => {

    dispatch({ type: orderConstans.DETAIL_ORDER_REQUEST });

    try {

        const { data } = await axios.get(`/api/v1/order/${orderId}`);

        dispatch({
            type: orderConstans.DETAIL_ORDER_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: orderConstans.DETAIL_ORDER_FALSE,
            payload: error.response
        })

    }
    
}
export const clearError = () => async (dispatch) => {

    dispatch({
        type: orderConstans.CLEAR_ERROR
    })

}
