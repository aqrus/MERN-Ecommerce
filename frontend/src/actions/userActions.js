const axios = require('axios');
const userConstants = require('../constant/userConnstants');

//Login user
const userLogin = ( email, password ) => async( dispatch, state ) => {
    
    dispatch({
        type: userConstants.USER_LOGIN_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await axios.post('/api/v1/auth/login', { email, password }, config );
        dispatch({
            payload: data,
            type: userConstants.USER_LOGIN_SUCCESS
        })
    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_LOGIN_FALSE
        })
    }

}

//user Register
const userRegister = (userData) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_REGISTER_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        
        const { data } = await axios.post('/api/v1/auth/me', userData, config );
        dispatch({
            payload: data,
            type: userConstants.USER_REGISTER_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_REGISTER_FALSE
        })
    }

}

//Load user
const loadUser = () => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_LOAD_REQUEST
    })

    try {
        
        const { data } = await axios.get('/api/v1/auth/me');
        dispatch({
            payload: data,
            type: userConstants.USER_LOAD_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_LOAD_FALSE
        })
    }

}

//Logout user
const logoutUser = () => async(dispatch) =>{

    try {
        
        const { data } = await axios.get('/api/v1/auth/logout');
        dispatch({
            payload: data,
            type: userConstants.USER_LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_LOGOUT_FALSE
        })
    }

}

//user update
const updateProfile = (userData) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_UPDATE_PROFILE_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        
        const { data } = await axios.put('/api/v1/auth/me/update', userData, config );
        dispatch({
            payload: data,
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.message,
            type: userConstants.USER_UPDATE_PROFILE_FALSE
        })
    }

}

//Update Password user
const updatePassword = (userData) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_UPDATE_PASSWORD_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        
        const { data } = await axios.put('/api/v1/auth/password/update', userData, config );
        dispatch({
            payload: data,
            type: userConstants.USER_UPDATE_PASSWORD_SUCCESS
        })

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_UPDATE_PASSWORD_FALSE
        })

    }

}

//Forgot Password user
const forgotPassword = (email) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_FORGOT_PASSWORD_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        
        const { data } = await axios.post('/api/v1/auth/password/forgot', email, config );
        dispatch({
            payload: data,
            type: userConstants.USER_FORGOT_PASSWORD_SUCCESS
        })

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_FORGOT_PASSWORD_FALSE
        })

    }

}

//Forgot Password user
const resetPassword = (token, password) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_NEW_PASSWORD_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        
        const { data } = await axios.put(`/api/v1/auth/password/reset/${token}`, password, config );
        dispatch({
            payload: data,
            type: userConstants.USER_NEW_PASSWORD_SUCCESS
        })

    } catch (error) {

        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_NEW_PASSWORD_FALSE
        })

    }

}

//Alls user
const allUsers = () => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_ALL_REQUEST
    })

    try {
        
        const { data } = await axios.get('/api/v1/auth/admin/users');
        dispatch({
            payload: data.users,
            type: userConstants.USER_ALL_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_ALL_FALSE
        })
    }

}

//user update
const updateUser = (userID,userData) => async(dispatch) =>{

    dispatch({
        type: userConstants.USER_UPDATE_REQUEST
    })

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        
        const { data } = await axios.put(`/api/v1/auth/admin/user/${userID}`, userData, config );
        dispatch({
            payload: data.success,
            type: userConstants.USER_UPDATE_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.message,
            type: userConstants.USER_UPDATE_FALSE
        })
    }

}
// Get user details
const getUserDetails = (id) => async (dispatch) => {
    dispatch({ type: userConstants.USER_DETAILS_REQUEST })
    try {

        const { data } = await axios.get(`/api/v1/auth/admin/user/${id}`)

        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//deleteUser
const deleteUser = (userID) => async(dispatch) => {
    
    dispatch({
        type: userConstants.USER_DELETE_REQUEST
    })

    try {
        
        const { data } = await axios.delete(`/api/v1/auth/admin/user/${userID}`);
        dispatch({
            payload: data.success,
            type: userConstants.USER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            payload: error.response.data.message,
            type: userConstants.USER_DELETE_FALSE
        })
    }

}

const clearError = () => async(dispatch) => {
    dispatch({
        type: userConstants.CLEAR_ERROR,
    })
}
export {
    userLogin,
    userRegister,
    loadUser,
    logoutUser,
    updateProfile,
    updatePassword,
    clearError,
    forgotPassword,
    resetPassword,
    allUsers,
    updateUser,
    deleteUser,
    getUserDetails
}