import {
    REQUEST_CONTACT,
    RECEIVE_CONTACT,
    HIDE_MENU,
    SET_FETCH_ERROR    
} from '../actions';

const initialContactState = {
    isFetching: false,
    didInvalidate: false,
    SSLMessage: "OK"
};

const contact = (state = initialContactState, action) => {    
    switch (action.type) {
        case HIDE_MENU: 
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                SSLMessage: "OK"
            }
        
        
        case REQUEST_CONTACT: 
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                SSLMessage: "OK"
            }
        
        case RECEIVE_CONTACT: 
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                SSLMessage: "Thank you. We will address your question shortly"
            }
        
            
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,                
                SSLMessage: action.SSLMessage
            }
        
        default: {
            return state;
        }
    }
};

export default contact