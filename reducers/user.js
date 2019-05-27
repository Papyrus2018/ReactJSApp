import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    REQUEST_USER,
    RECEIVE_USER,
    REQUEST_REGISTER,
    RECEIVE_REGISTER,
    REQUEST_UNSUBSCRIBE_USER,
    RECEIVE_UNSUBSCRIBE_USER,    
    REQUEST_UPDATE_USER,
    RECEIVE_UPDATE_USER,
    REQUEST_UPDATE_PASSWORD,
    RECEIVE_UPDATE_PASSWORD,
    SET_LOCAL_TOKEN,
} from '../actions';

import {setPersistentToken} from '../lib/securestorage'

const initialUserState = {
    isFetching: false,
    error: '',
    token: false,
    user: {}
};

const user = (state = initialUserState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
        case REQUEST_USER:
        case REQUEST_REGISTER:
        case REQUEST_UNSUBSCRIBE_USER:
        case REQUEST_UPDATE_USER:
        case REQUEST_UPDATE_PASSWORD:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_LOGIN:
        case RECEIVE_REGISTER:
            if (!action.data.success) {
                return {
                    ...state,
                    isFetching: false,
                    error: action.data.message
                }
            } else {                
                setPersistentToken(action.data.token)
                return {
                    ...state,
                    isFetching: false,
                    token: action.data.token
                }
            }
        case RECEIVE_USER:
            if (!action.data.success) {                
                return {
                    ...state,
                    isFetching: false,
                    error: action.data.message
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                    user: action.data.user
                    
                }
            }
        case RECEIVE_UPDATE_USER:
            if (!action.data.success) {
                return {
                    ...state,
                    isFetching: false,
                    error: action.data.message
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                    user: action.data.user
                }
            }
        case RECEIVE_UNSUBSCRIBE_USER:
            if (!action.data.success) {
                return {
                    ...state,
                    isFetching: false,
                    error: action.data.message
                }
            } else {
                return {
                    ...state,
                    isFetching: false,                    
                    user: action.data.user,
                    token: action.data.token
                }
            }
        case RECEIVE_UPDATE_PASSWORD:
            if (!action.data.success) {
                return {
                    ...state,
                    isFetching: false,
                    error: action.data.message
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                }
            }
        case SET_LOCAL_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
};

export default user