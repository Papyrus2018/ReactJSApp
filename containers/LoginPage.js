import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ons from 'onsenui';


import * as Actions from '../actions';

import {
    Page,
    Button,
    Input
} from 'react-onsenui';

import NavBar from '../components/NavBar';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.resendVerificationEmail = this.resendVerificationEmail.bind(this);

        this.state = {
            user: {
                email: '',
                password: ''
            }
        };
    }

    componentDidMount() {
    }

    
    checkFields() {
        return new Promise(function(resolve, reject) {
            var error = false;
            Object.keys(this.state.user).forEach(function(key) {
                if (this.state.user[key] === '') {
                    error = true;
                }
            }.bind(this))
            if (error) {
                return ons.notification.alert({
                    title: 'Error!',
                    message: 'Please fill in all fields',
                    cancelable: true
                })
            } else {
                //verify email format
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.user.email)) {
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

    loginUser() {
        this.checkFields()
        .then(() => {
            var user = this.state.user;
            return this.props.actions.login(user.email, user.password, function(data) {
                if (!data.success) {
                    ons.notification.alert({
                        title: 'Error!',
                        message: data.message,
                        cancelable: true
                    })
                } else {
                    this.props.actions.getUser(data.token, function(data) {
                        this.props.navigator.popPage()
                    }.bind(this));
                }
            }.bind(this));
        })
    }

    resendVerificationEmail() {
        return this.props.actions.resendVerificationEmail(user, function(data) {
            if (!data.success) {
                ons.notification.alert({
                    title: 'Error!',
                    message: data.message,
                    cancelable: true
                })
            } else {
                ons.notification.alert({
                    title: 'Succes!',
                    message: 'Verification link sent',
                    cancelable: true
                })
            }
        })
    }

    handleChange(e) {
        const id = e.target.id
        const value = e.target.value
        this.state.user[id] = value;
    }


    renderToolbar(title) {
        return <NavBar title="Login" navigator={navigator} backButton={true}/>
    }

    render() {
            var padding = {padding: '5px'};
            return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={padding}>
                    <Input
                        inputId='email'
                        onChange={this.handleChange}
                        type='email'
                        modifier='underbar'
                        float
                        placeholder='Email' />
                    <Input
                        inputId='password'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='Password' />
                    <Button style={{margin: '6px'}} onClick={this.loginUser} modifier='cta'>
                        Login
                    </Button>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)