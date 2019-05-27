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

class PasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);

        this.state = {
            user: {
                oldpassword: '',
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
                return resolve(true);
            }
        }.bind(this))
    }

    checkPasswords() {
        return new Promise(function(resolve, reject) {
            if (this.state.user.password !== this.state.user.password2) {
                return ons.notification.alert({
                    title: 'Error!',
                    message: 'New Passwords do not match',
                    cancelable: true
                })
            } else {
                return resolve(true);
            }
        }.bind(this))
    }

    changePassword() {
        this.checkFields()
        .then(this.checkPasswords)
        .then(() => {
            var user = this.state.user;
            var token = this.props.userState.token
            return this.props.actions.updatePassword(token, user.oldpassword, user.password, function(data) {
                if (!data.success) {
                    ons.notification.alert({
                        title: 'Error!',
                        message: data.message,
                        cancelable: true
                    })
                } else {
                    console.log('Succesfully changed password');
                    this.props.navigator.popPage();
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
        return <NavBar title="Change Password" navigator={navigator} backButton={true}/>
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div>
                    <Input
                        inputId='oldpassword'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='Old Password' />
                    <Input
                        inputId='password'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='New Password' />
                    <Input
                        inputId='password2'
                        onChange={this.handleChange}
                        modifier='underbar'
                        type='password'
                        float
                        placeholder='Repeat Password' />
                    <Button style={{margin: '6px'}} onClick={this.changePassword} modifier='cta'>
                        Change
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage)