import {doStorage, doNoStorage} from '../index';


var storage;
var onDeviceReady = require('cordova-deviceready');
var needScreenLock = false; 


var _init = function() {
        storage = new cordova.plugins.SecureStorage(
        function () {
            console.log('Securestorage Success');
            doStorage();
        },
        function (error) {
            //screen lock is disabled
            console.log("ENABLE SCREEN LOCK");
            needScreenLock = true;
            doNoStorage();
        },
        'zion_app'
        );        
}

onDeviceReady(function () {
        // deviceready has been called        
        console.log("DEVICE READY");
        _init();
});

export const isScreenLockNeeded = () => {
    return needScreenLock;
}
  
    

export const setPersistentToken = (token) => {
    return storage.set(
        function (key) {
            console.log('Token set')
        },
        function (error) {
            console.log('Error ' + error);
        },
        'token', token
    );
}

export const getPersistentToken = (cb) => {

    return storage.get(
        cb,
        function (error) {
            console.log('Error, ' + error);
        },
        'token'
    );
}


export const removePersistentToken = () => {

    storage.remove(
        function (key) {
            console.log('Token Storage Cleared'); 
        },
        function (error) { 
            console.log('Error Clear Token Storage, ' + error); 
        },
        'token'
    );
    
}

