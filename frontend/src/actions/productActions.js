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
            payload: data.product,
            type: productConstants.PRODUCTS_DETAIL_SUCCESS
        });

    } catch (error) {

        dispatch({
            payload: error.response,
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

const newProduct = (productData) => async (dispatch) => {
    
    dispatch({ type: productConstants.PRODUCTS_NEW_REQUEST});

    try {
        const config = {
            'Content-type':'application/json'
        }
        const { data }  = await axios.post(`/api/v1/products/admin/new`, productData, config);

        dispatch({
            payload: data,
            type: productConstants.PRODUCTS_NEW_SUCCESS
        });

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_NEW_FALSE
        });

    }
}
const deleteProduct = (productID) => async(dispatch) => {
    dispatch({ type: productConstants.PRODUCTS_DELETE_REQUEST});

    try {
        const { data }  = await axios.delete(`/api/v1/products/admin/${productID}`);

        dispatch({
            payload: data.success,
            type: productConstants.PRODUCTS_DELETE_SUCCESS
        });

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_DELETE_FALSE
        });

    }
}

const updateProduct = (productID, productData) => async(dispatch) => {
    dispatch({ type: productConstants.PRODUCTS_UPDATE_REQUEST});

    const config = {
        'Content-type': 'application/json'
    }
    try {
        const { data }  = await axios.put(`/api/v1/products/admin/${productID}`, productData, config);

        dispatch({
            payload: data.success,
            type: productConstants.PRODUCTS_UPDATE_SUCCESS
        });

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: productConstants.PRODUCTS_UPDATE_FALSE
        });

    }
}
// Get product reviews
const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: productConstants.PRODUCTS_REVIEW_GET_REQUEST })

        const { data } = await axios.get(`/api/v1/products/review/${id}`)

        dispatch({
            type: productConstants.PRODUCTS_REVIEW_GET_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: productConstants.PRODUCTS_REVIEW_GET_FALSE,
            payload: error.response.data.message
        })
    }
}

// Delete product review
const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: productConstants.PRODUCTS_REVIEW_DELETE_REQUEST })

        const { data } = await axios.delete(`/api/v1/products/review?id=${id}&productId=${productId}`)

        dispatch({
            type: productConstants.PRODUCTS_REVIEW_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: productConstants.PRODUCTS_REVIEW_DELETE_FALSE,
            payload: error.response.data.message
        })
    }
}

const clearErrors = () => async (dispatch) => {
    dispatch({
        type: productConstants.CLEAR_ERRORS
    })
}
export {
    getProducts,
    getProductDetails,
    newReview,
    getAdminProducts,
    newProduct,
    deleteProduct,
    updateProduct,
    getProductReviews,
    deleteReview,
    clearErrors
}