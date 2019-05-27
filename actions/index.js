import * as api from '../api';
import * as firebase from '../lib/firebase';
import {removePersistentToken} from '../lib/securestorage'

export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';

export const REQUEST_ALERTS = 'REQUEST_ALERTS';
export const RECEIVE_ALERTS = 'RECEIVE_ALERTS';
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const REQUEST_BLOG_LIST = 'REQUEST_BLOG_LIST';
export const RECEIVE_BLOG_LIST = 'RECEIVE_BLOG_LIST';
export const REQUEST_BLOG = 'REQUEST_BLOG';
export const RECEIVE_BLOG = 'RECEIVE_BLOG';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';
export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER';
export const RECEIVE_UPDATE_USER = 'RECEIVE_UPDATE_USER';
export const REQUEST_UNSUBSCRIBE_USER = 'REQUEST_UNSUBSCRIBE_USER';
export const RECEIVE_UNSUBSCRIBE_USER = 'RECEIVE_UNSUBSCRIBE_USER';
export const REQUEST_UPDATE_PASSWORD = 'REQUEST_UPDATE_PASSWORD';
export const RECEIVE_UPDATE_PASSWORD = 'RECEIVE_UPDATE_PASSWORD';

export const REQUEST_CONTACT = 'REQUEST_CONTACT';
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT';

export const SET_LOCAL_TOKEN = 'SET_LOCAL_TOKEN';

export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';


export const showMenu = () => ({type: SHOW_MENU});
export const hideMenu = () => ({type: HIDE_MENU});


export const selectAlert = (id) => ({
    type: SELECT_ALERT,
    id
});
export const requestAlerts = () => ({
    type: REQUEST_ALERTS
});
export const receiveAlerts = (alerts) => ({
    type: RECEIVE_ALERTS,
    alerts
});
export const requestTags = () => ({
    type: REQUEST_TAGS
});
export const receiveTags = (tags) => ({
    type: RECEIVE_TAGS,
    tags
});
export const setFetchError = (SSLMessage) => ({
    type: SET_FETCH_ERROR,
    SSLMessage
});
export const requestBlogList = () => ({
    type: REQUEST_BLOG_LIST
});
export const receiveBlogList = (bloglist) => ({
    type: RECEIVE_BLOG_LIST,
    bloglist
});
export const requestBlog = () => ({
    type: REQUEST_BLOG
});
export const receiveBlog = (blog) => ({
    type: RECEIVE_BLOG,
    blog
});

export const requestLogin = () => ({
    type: REQUEST_LOGIN
});
export const receiveLogin = (data) => ({
    type: RECEIVE_LOGIN,
    data
});
export const requestUser = () => ({
    type: REQUEST_USER
});
export const receiveUser = (data) => ({
    type: RECEIVE_USER,
    data
});

export const requestRegister = () => ({
    type: REQUEST_REGISTER
});
export const receiveRegister = (data) => ({
    type: RECEIVE_REGISTER,
    data
});
export const requestUpdateUser = () => ({
    type: REQUEST_UPDATE_USER
});
export const receiveUpdateUser = (data) => ({
    type: RECEIVE_UPDATE_USER,
    data
});
export const requestUnsubscribeUser = () => ({
    type: REQUEST_UNSUBSCRIBE_USER
});
export const receiveUnsubscribeUser = (data) => ({
    type: RECEIVE_UNSUBSCRIBE_USER,
    data
});

export const requestUpdatePassword = () => ({
    type: REQUEST_UPDATE_PASSWORD
});
export const receiveUpdatePassword = (data) => ({
    type: RECEIVE_UPDATE_PASSWORD,
    data
});
export const requestContactInfo = () => ({
    type: REQUEST_CONTACT
});
export const receiveContactInfo = (data) => ({
    type: RECEIVE_CONTACT,
    data
});


export const setLocalToken = (token) => ({
    type: SET_LOCAL_TOKEN,
    token
})


export const fetchAlerts = (callback) => {
    return (dispatch) => {
        dispatch(requestAlerts());
        dispatch(requestTags());
        api.queryAlerts()
            .then((data) => dispatch(receiveAlerts(data)))
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")));
        api.queryTags()
            .then((data) => {
                firebase.syncAllTags(data);
                return dispatch(receiveTags(data))
            })
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")))
            .then(callback)
    };

};

export const fetchTags = (callback) => {
    return (dispatch) => {
        dispatch(requestTags());
        api.queryTags()
            .then((data) => {
                firebase.syncAllTags(data);
                return dispatch(receiveTags(data))
            })
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")))
            .then(callback)
    };

};

export const fetchBlogList = (callback) => {
    return (dispatch) => {
        dispatch(requestBlogList());
        api.queryBlogList()
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")))
            .then((data) => dispatch(receiveBlogList(data)))
            .then(callback);
    };

};

export const fetchBlog = (id) => {
    return (dispatch) => {
        dispatch(requestBlog());
        api.queryBlog(id)
            .then((data) => dispatch(receiveBlog(data)))
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")));
    };

};

export const login = (email, password, callback) => {
    return (dispatch) => {
        dispatch(requestLogin());
        api.login(email, password)
            .then((data) => {
                dispatch(receiveLogin(data))
                callback(data);
            })
            .catch(() => callback({success: false, message: "Insecure connection. Please try again later"}));
    };
};

export const getUser = (token, callback) => {
    return (dispatch) => {
        dispatch(requestUser());
        api.getUser(token)
            .catch(() => dispatch(setFetchError()))
            .then((data) => {
                firebase.subscribeToTags(data.user.tags);
                dispatch(receiveUser(data))
                callback(data);
            });
    };
};

export const getUserEmail = (token, callback) => {
    console.log("Action get user email")
    return (dispatch) => {
        api.getUser(token)
            .catch(() => dispatch(setFetchError()))
            .then((data) => {         
                console.log("Action get user email dispatching: "+data);
                dispatch(receiveUser(data))
                callback(data);
            });
    };
};


export const register = (firstName, lastName, email, password, callback) => {
    return (dispatch) => {
        dispatch(requestRegister());
        api.register(firstName, lastName, email, password)
            .then((data) => {
                dispatch(receiveRegister(data));
                callback(data)
            })
            .catch(() => callback({success: false, message: "Insecure connection. Please try again later"}));
    };

};

export const updateUser = (token, firstName, lastName, notifyEmail, notifyMobile, tags, callback) => {
    return (dispatch) => {
        dispatch(requestUpdateUser());
        api.updateUser(token, firstName, lastName, notifyEmail, notifyMobile, tags)
            .then((data) => {
                firebase.subscribeToTags(data.user.tags);
                dispatch(receiveUpdateUser(data));
                callback(data)
            })
            .catch(() => callback({success: false, message: "Insecure connection. Please try again later"}));
    };

};

export const unsubscribeUser = (token, firstName, lastName, tags, callback) => {
    
    
    return (dispatch) => {
        dispatch(requestUnsubscribeUser());
        api.unsubscribeUser(token, firstName, lastName)
            .then((data) => { 
                firebase.unSubscribeFromTags(tags);
                removePersistentToken();
                dispatch(receiveUnsubscribeUser(data));
                callback(data)
            })
            .catch(() => callback({success: false, message: "Insecure connection. Please try again later"}));
    };

};


export const updatePassword = (token, oldPassword, password, callback) => {
    return (dispatch) => {
        dispatch(requestUpdatePassword());
        api.updatePassword(token, oldPassword, password)
            .catch(() => dispatch(setFetchError()))
            .then((data) => {
                dispatch(receiveUpdatePassword(data));
                callback(data)
            })
    };

};

export const resendVerificationEmail = (user, callback) => {
    api.resendVerificationEmail(user.email)
    .then((data) => {
        callback(data);
    })
}



export const sendContactInfo = (email, subject, content, captcha, callback) => {
    return (dispatch) => {
        dispatch(requestContactInfo());        
        api.sendContact(email, subject, content, captcha)
            .then((data) => {
                dispatch(receiveContactInfo(data));
                callback(data)
            })
            .catch(() => dispatch(setFetchError("Insecure connection. Please try again later")))
    };

};