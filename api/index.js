import fetch from 'isomorphic-fetch';
import Promise from 'promise';
import config from './../config'

const api = config.api
const API_URL = `${api.prot}://${api.host}:${api.port}${api.path}`;


const bearerToken = (token) => {
    return 'Bearer ' + token
}

const apiCall = (url, options = {}, apiCallCallBack) => {
	
    var serverURL = api.prot+"://"+api.host;
    var SSLfingerprint = api.SSLfingerprint;
    
    console.log("API CALL, serverURL = "+serverURL +", fingerprint = "+SSLfingerprint);

    function successCallback(message) {
        console.log("SSL Success, "+message);
        return new Promise(
            (resolve, reject) => {
             fetch(url, options).then(response => {
                    if (response.status >= 400) {
                        console.log("INVALID API CALL RESPONSE");
                        apiCallCallBack(false, 'Invalid response');			
                    } else {
                        console.log("response = "+response.json);
                        apiCallCallBack(true, response.json());			                        
                    }   
            })
        });
    }

    function errorCallback(message) {
        console.log("SSL unsuccessful, "+message);
        if (message === "CONNECTION_NOT_SECURE") {
            // There is likely a man in the middle attack going on, be careful!
            console.log("MITM");  
            apiCallCallBack(false, 'Invalid response');			
            
        } else if (message.indexOf("CONNECTION_FAILED") >- 1) {
            // There was no connection (yet). Internet may be down. Try again (a few times) after a little timeout.
            console.log("Connection failed");            
            apiCallCallBack(false, 'Invalid response');			

        }
    }
    
    window.plugins.sslCertificateChecker.check(
          successCallback,
          errorCallback,
          serverURL,
          SSLfingerprint);

}

export const queryAlerts = () => {
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/alerts`, {}, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
        }
    )
}
      

export const queryTags = () => {
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/tags`, {}, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const queryBlogList = () => {
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/blogs`, {}, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const queryBlog = (id) => {
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/blogs/${id}`, {}, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}


export const login = (email, password) => {
    var user = {
        email: email,
        password: password
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include',
        body: JSON.stringify(user)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/login`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const getUser = (token) => {
    var options = {
        method: 'GET',
        headers: {
            'Authorization': bearerToken(token)
        }
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const register = (firstName, lastName, email, password) => {
    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/register`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}


export const sendContact = (email, subject, content, captcha) => {
    var contact = {
        email: email,
        subject: subject,
        content: content,
        captcha: captcha
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/contact/contact`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}


export const updateUser = (token, firstName, lastName, notifyEmail, notifyMobile, tags) => {
    var update = {
        firstName: firstName,
        lastName: lastName,
        notifyEmail: notifyEmail,
        notifyMobile: notifyMobile,
        tags: tags
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken(token)
        },
        body: JSON.stringify(update)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/update`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const unsubscribeUser = (token, firstName, lastName) => {
       
    var update = {
        firstName: firstName,
        lastName: lastName  
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken(token)
        },
        body: JSON.stringify(update)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/unsubscribe`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}



export const updatePassword = (token, oldPassword, password) => {
    var update = {
        oldPassword: oldPassword,
        password: password
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken(token)
        },
        body: JSON.stringify(update)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/password`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}

export const resendVerificationEmail = (email) => {
    var email = {
        email: email
    };
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }
        
    return new Promise(
        function(resolve, reject) {
            apiCall(`${API_URL}/user/verify`, options, function(isValid, response) {
                if (isValid) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })    
        }
    )
}


