import {
    REQUEST_BLOG,
    RECEIVE_BLOG,
    SET_FETCH_ERROR
} from '../actions';

const initialBlogState = {
    isFetching: false,
    didInvalidate: false,
    dict: {},
    SSLMessage: "OK"
};

const blog = (state = initialBlogState, action) => {    
    switch (action.type) {
        case REQUEST_BLOG:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                SSLMessage: "OK"
            }
        case RECEIVE_BLOG:
            const id = action.blog.id;
            const content = action.blog.content;
            var newDict = state.dict;
            newDict[id] = content;
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                dict: newDict,
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

export default blog