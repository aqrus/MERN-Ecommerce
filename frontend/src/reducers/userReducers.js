const userConstants = require('../constant/userConnstants');

const authReducers = (state  = { user:{} }, action) => {
    
    switch (action.type) {

        case userConstants.USER_LOGIN_REQUEST:
        case userConstants.USER_REGISTER_REQUEST:
        case userConstants.USER_LOAD_REQUEST:
            return {
                loading : true,
                isAuthenticated: false
            }

        case userConstants.USER_LOGIN_SUCCESS:
        case userConstants.USER_REGISTER_SUCCESS:
        case userConstants.USER_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            }

        case userConstants.USER_LOAD_FALSE:
            return {

                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,

            }
        
        case userConstants.USER_LOGOUT_SUCCESS:
            return {

                loading: false,
                isAuthenticated: false,
                user: null,

            }
        
        case userConstants.USER_LOGOUT_FALSE:
            return {
                ...state,
                error: action.payload
            }
        
        case userConstants.USER_LOGIN_FALSE:
        case userConstants.USER_REGISTER_FALSE:
            return {

                ...state,
                error: action.payload,
                loading: false,
                isAuthenticated: false,
                user: null

            }

        default:
            return state;

    }
}

const userReducers = (state = {}, action) => {

    switch (action.type) {

        case userConstants.USER_UPDATE_PROFILE_REQUEST:
        case userConstants.USER_UPDATE_REQUEST:
        case userConstants.USER_UPDATE_PASSWORD_REQUEST:
        case userConstants.USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
            
        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
        case userConstants.USER_UPDATE_SUCCESS:
        case userConstants.USER_UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdate: action.payload
            }
        
        case userConstants.USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case userConstants.USER_UPDATE_PROFILE_FALSE:
        case userConstants.USER_UPDATE_FALSE:
        case userConstants.USER_UPDATE_PASSWORD_FALSE:
        case userConstants.USER_DELETE_FALSE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case userConstants.USER_UPDATE_PROFILE_RESET:
        case userConstants.USER_UPDATE_RESET:
        case userConstants.USER_UPDATE_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                isUpdate: false
            }
        case userConstants.USER_DELETE_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            }

        case userConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case userConstants.USER_FORGOT_PASSWORD_REQUEST:
        case userConstants.USER_NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case userConstants.USER_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        
        case userConstants.USER_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload,
            }
        case userConstants.USER_FORGOT_PASSWORD_FALSE:
        case userConstants.USER_NEW_PASSWORD_FALSE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case userConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

const allUsersReducer = (state={ users:[] }, action) => {

    switch (action.type) {

        case userConstants.USER_ALL_REQUEST:
            return {
                loading: true,
            };

        case userConstants.USER_ALL_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case userConstants.USER_ALL_FALSE:
            return {
                loading: false,
                error: action.payload
            }
        case userConstants.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case userConstants.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case userConstants.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case userConstants.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case userConstants.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export {
    authReducers,
    userReducers,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
}