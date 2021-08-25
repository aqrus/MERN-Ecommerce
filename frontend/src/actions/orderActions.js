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
        console.log(error.response.data.message)
        dispatch({
            type: orderConstans.CREATE_ORDER_FALSE,
            payload: error.response.data.message
        })

    }
}

export const clearError = () => async (dispatch) => {

    dispatch({
        type: orderConstans.CLEAR_ERROR
    })

}