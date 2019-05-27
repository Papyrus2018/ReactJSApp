import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ons from 'onsenui';

import * as Actions from '../actions';

import {
    Page,
    Button,
    Input,
    AlertDialog
} from 'react-onsenui';

import NavBar from '../components/NavBar';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                password2: ''
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

    checkPasswords() {
        return new Promise(function(resolve, reject) {
            if (this.state.user.password !== this.state.user.password2) {
                return ons.notification.alert({
                    title: 'Error!',
                    message: 'Passwords do not match',
                    cancelable: true
                })
            } else {
                return resolve(true);
            }
        }.bind(this))
    }

    registerUser() {
        this.checkFields()
        .then(this.checkPasswords)
        .then(() => {
            var user = this.state.user;
            return this.props.actions.register(user.firstName, user.lastName, user.email, user.password, function(data) {
                if (!data.success) {
                    ons.notification.alert({
                        title: 'Error!',
                        message: data.message,
                        cancelable: true
                    })
                } else {
                    ons.notification.alert({
                        title: 'Succesfully registered',
                        message: 'To activate your account, please click on the link sent to your email address.',
                        cancelable: true
                    })
                    this.props.navigator.popPage()
                }
            }.bind(this));
        })
    }

    handleChange(e) {
        const id = e.target.id
        const value = e.target.value
        this.state.user[id] = value;
    }


    renderToolbar(title) {
        return <NavBar title="Register" navigator={navigator} backButton={true}/>
    }

    render() {
        var padding = {padding: '5px'};
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={padding}>
                    <Input
                        inputId='firstName'
                        onChange={this.handleChange}
                        modifier='underbar'
                        float
                        placeholder='Firstname' />
                    <Input
                        inputId='lastName'
                        onChange={this.handleChange}
                        modifier='underbar'
                        float
                        placeholder='Lastname' />
                    <Input
                        inputId='email'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='email'
                        float
                        placeholder='Email' />
                    <Input
                        inputId='password'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='Password' />
                    <Input
                        inputId='password2'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='Repeat Password' />
                    <Button style={{margin: '6px'}} onClick={this.registerUser} modifier='cta'>
                        Register
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)