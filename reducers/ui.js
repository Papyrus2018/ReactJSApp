import {
    SHOW_MENU,
    HIDE_MENU,
    SELECT_PROFILE,
    SELECT_ALERTS,
    SELECT_BLOGPOSTS,
    SELECT_NEWSFEED,
    SELECT_ALERT,
    SELECT_INFO,
    SELECT_CONTACT
} from '../actions';

import AlertList from '../containers/AlertList';


const initialState = {
    //view: {component: AlertList, key: 'ALERTS'},
    menu: false,
    id: null
}

const ui = (state = initialState , action) => {
    switch(action.type) {
        case SHOW_MENU:
            return {
                ...state,
                menu: true
            }
        case HIDE_MENU:
            return {
                ...state,
                menu: false
            }
        // case SELECT_PROFILE:
        // case SELECT_ALERTS:
        // case SELECT_BLOGPOSTS:
        // case SELECT_NEWSFEED:
        // case SELECT_INFO:
        // case SELECT_CONTACT:
        //     return {
        //         ...state,
        //         view: {component: action.component, key: action.view}
        //     }
        case SELECT_ALERT:
            return {
                ...state,
                id: action.id
            }
        default:
            return state;
    }
};

export default ui;