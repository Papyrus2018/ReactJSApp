import {
    REQUEST_BLOG_LIST,
    RECEIVE_BLOG_LIST,
    SET_FETCH_ERROR
} from '../actions';


const initialBlogsState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    SSLMessage: "OK"
};

const blogs = (state = initialBlogsState, action) => {
    switch (action.type) {
        case REQUEST_BLOG_LIST:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_BLOG_LIST: {            
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.bloglist,
                SSLMessage: "OK"
            }
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



export default blogs