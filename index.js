import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import jwt from 'jsonwebtoken';

import reducers from './reducers';
import {setLocalToken} from './actions';

import {/*removePersistentToken,*/getPersistentToken, isScreenLockNeeded} from './lib/securestorage'

import AlertList from './containers/AlertList';
import BlogList from './containers/BlogList';
import ProfilePage from './containers/ProfilePage';
import Warning from './components/Warning';


import App from './containers/MainPage';
import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css'

var onDeviceReady = require('cordova-deviceready');

const logger = createLogger();
const store = createStore(
    reducers,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    applyMiddleware(thunk, logger)
);


//removePersistentToken("foo");

const initialPage = {
    component: AlertList,
    key: 'ALERT_LIST'
}

const rootElement = document.getElementById('root');

export const doNoStorage = () => {
    ons.ready(() => render(
    <Warning/>,
    rootElement
    ));
}

export const doStorage = () => {
    getPersistentToken(function(token) {
            var decoded = jwt.decode(token);
            var expiryDate = new Date(decoded.exp*1000)
            var currentDate = new Date();
            //token is not expired
            if( expiryDate > currentDate) {
                store.dispatch(setLocalToken(token))
            }
        });

    ons.ready(() => render(
    <Provider store={store}>
        <App initialPage={initialPage}/>
    </Provider>,
    rootElement
    ));    
}
