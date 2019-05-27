import {
    REQUEST_ALERTS,
    RECEIVE_ALERTS,
    SET_FETCH_ERROR
} from '../actions';


const initialAlertState = {};

const alert = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ALERT:
            return {
                id: action.id,
                name: action.name
            }
        default:
            return state;
    }
};


const initialAlertsState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    SSLMessage: "OK"
};

const alerts = (state = initialAlertsState, action) => {
    switch (action.type) {
        case REQUEST_ALERTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_ALERTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.alerts,
                SSLMessage: "OK"
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,                
                SSLMessage: action.SSLMessage
            }
            
        default:
            return state;
    }
};



export default alerts