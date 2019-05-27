import {
    REQUEST_TAGS,
    RECEIVE_TAGS,
    SET_FETCH_ERROR
} from '../actions';


const initialTagsState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

const tags = (state = initialTagsState, action) => {
    switch (action.type) {
        case REQUEST_TAGS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.tags
            }
        default:
            return state;
    }
};



export default tags