const axios = require('axios');
const productConstants = require('../constant/productConstants');

const getProducts = ( pageInfo ) => async (dispatch) => {

    const { curentPage, keyword, price, category, ratings } = pageInfo;
    dispatch({ type: productConstants.PRODUCTS_LIST_REQUEST});

    try {

        const { data }  = await axios.get(`/api/v1/products?pageNumber=${ curentPage }&keyword=${ keyword }&min=${ price[0] }&max=${ price[1] }&category=${category}&rating=${ratings}`);
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
    
    dispatch({ type: productConstants.PRODUCTS_DETAIL_REQUEST});

    try {

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

const newReview = (reviewData) => async (dispatch) => {
    
    dispatch({ type: productConstants.PRODUCTS_REVIEW_REQUEST});

    try {
        const config = {
            'Content-type':'application/json'
        }
        const { data }  = await axios.put(`/api/v1/products/review`, reviewData, config);

        dispatch({
            payload: data.success,
            type: productConstants.PRODUCTS_REVIEW_SUCCESS
        });

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_REVIEW_FALSE
        });

    }
}

const getAdminProducts  = () => async (dispatch) => {

    dispatch({ type: productConstants.PRODUCTS_LIST_ADMIN_REQUEST});

    try {

        const { data: { products } }  = await axios.get(`/api/v1/products/admin`);
        dispatch({
            payload: products,
            type: productConstants.PRODUCTS_LIST_ADMIN_SUCCESS
        });

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_LIST_ADMIN_FALSE
        });

    }

}
export {
    getProducts,
    getProductDetails,
    newReview,
    getAdminProducts
}