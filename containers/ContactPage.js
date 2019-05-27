import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ons from 'onsenui';
import config from '../config'
import * as Actions from '../actions';

const captchaKey = config.captcha.key;

import {
    Page,
    Input,
    textarea,
    Button
} from 'react-onsenui';

import NavBar from '../components/NavBar';


class ContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
        this.sendContactInfo = this.sendContactInfo.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
        
        this.state = {
            contactInfo : {
                email: '',
                subject: '',
                content: '',
                captcha: '',
                user: {}
            }
        };
    }
    
    componentDidMount() {
        console.log("ContactPage did mount");
        
        window.addEventListener("message", this.captchaChange, false);
        
        var token = this.props.userState.token
        console.log("ContactPage token: "+token);

        if (token) {
            this.props.actions.getUserEmail(token, function(data) {
                if (data.success) {
                    console.log("ContactPage getUser success: "+this.props.contactState.user);    
                } else {
                    console.log("ContactPage getUser NO success: ");    
                }
            })
        }        
        this.setState({
            user: this.props.userState.user
        })
        console.log("Mount, user: "+this.props.userState.user.email);
    }
    
    //new
    componentWillUnmount() {
        window.removeEventListener("message", this.captchaChange);
    }
    
    checkFields() {
        return new Promise(function(resolve, reject) {
            var error = false;
            Object.keys(this.state.contactInfo).forEach(function(key) {
                if (this.state.contactInfo[key] === '') {
                    error = true;
                }         
            }.bind(this))
            if (error) {
                return ons.notification.alert({                    
                    title: 'Error!',
                    message: 'Please fill in all fields and check the captcha.',
                    cancelable: true
                })
            } else {
                //verify email format
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.contactInfo.email)) {
                    return resolve(true);
                } else {
                  return ons.notification.alert({
                    title: 'Error!',
                    message: 'Please fill in a valid email address',
                    cancelable: true
                    })  
                    
                }        
            }
        }.bind(this))
    }
    
    sendContactInfo() {           
        this.checkFields()
        .then(() => {
            var contactInfo = this.state.contactInfo;
            console.log(contactInfo);
            return this.props.actions.sendContactInfo(contactInfo.email, contactInfo.subject, contactInfo.content, contactInfo.captcha, function(data) {
                console.log("data = " + data);
                if (!data.success) {
                    ons.notification.alert({
                        title: 'Error!',
                        message: data.message,
                        cancelable: true
                    })
                } 
            }.bind(this));
        })
    }
    
    handleChange(e) {
        const id = e.target.id
        const value = e.target.value        
        this.state.contactInfo[id] = value;
    }    
    
    captchaChange = (e) => {
		if (e.origin != 'https://zionalert.azurewebsites.net') {
            console.log("IFrame from wrong domain, aborting...");
            return;
        } else {
			if (e.data.indexOf('setImmediate') < 0) {
                console.log("Setting captcha token: "+e.data);
				this.state.contactInfo["captcha"] = e.data;
			}
		}
    }

    renderToolbar(title) {
        return <NavBar title={"Contact"} navigator={navigator} backButton={false}/>
    }

    render() {  
        var padding = {padding: '5px'};
        if (this.props.contactState.SSLMessage == "OK") {
             var email = this.props.userState.user.email;
             if (email == '' || email == 'undefined') {
                 email = 'email';
             }
               return (         
                    <Page renderToolbar={this.renderToolbar}>
                        <div style={padding}>
                             <Input
                                inputId='email'
                                onChange={this.handleChange}
                                modifier='underbar'
                                type='email'
                                float
                                placeholder='email'
                                value={email} />                        
                            <br/>
                            <Input
                                inputId='subject'
                                onChange={this.handleChange}
                                modifier='underbar'
                                float
                                placeholder='Subject' />                    
                            <br/>
                            <br/>
                            <textarea id='content' onChange={this.handleChange} className="textarea" rows="5" placeholder="Message"></textarea>
                            <br/>
                            <br/>
                            <p>Note: please fill in the form first and tick the captcha before sending</p>
                            <br/>
                            <br/>                            
                            <Button style={{margin: '6px'}} onClick={this.sendContactInfo} modifier='cta'>
                                Send
                            </Button>
							<br/>
							<br/>
							<iframe src="https://zionalert.azurewebsites.net/api/contact/captcha"
                            width="100%" height="280"></iframe>                            
                        </div>
                    </Page>
                );     
            
        } else {            
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding} dangerouslySetInnerHTML={{ __html: this.props.contactState.SSLMessage }}/>
                </Page>
            );
        }
        
       
    }
}

const mapStateToProps = (state) => ({    
    userState: state.user,
    contactState: state.contact
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)