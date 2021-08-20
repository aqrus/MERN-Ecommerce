const axios = require('axios');
const productConstants = require('../constant/producConstants');

const getProducts = () => async (dispatch) => {
    
    try {

        dispatch({ type: productConstants.PRODUCTS_LIST_REQUEST});

        const { data }  = await axios.get('/api/v1/products');
        dispatch({
            payload: data,
            type: productConstants.PRODUCTS_LIST_SUCCESS
        });

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_LIST_FALSE
        });

    }
}

const getProductDetails = (id) => async (dispatch) => {
    
    try {

        dispatch({ type: productConstants.PRODUCTS_DETAIL_REQUEST});

        const { data }  = await axios.get(`/api/v1/products/${id}`);
        dispatch({
            payload: data,
            type: productConstants.PRODUCTS_DETAIL_SUCCESS
        });

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_DETAIL_FALSE
        });

    }
}
export {
    getProducts,
    getProductDetails
}