import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ons from 'onsenui';


import * as Actions from '../actions';

import {
    Page,
    Button,
    Switch,
    Input,
    Icon,
    List,
    ListItem,
    ListHeader,
    Checkbox,
    AlertDialog
    
} from 'react-onsenui';

import NavBar from '../components/NavBar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PasswordPage from './PasswordPage';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.toggleFirstName = this.toggleFirstName.bind(this);
        this.toggleLastName = this.toggleLastName.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.renderPassword = this.renderPassword.bind(this);
        this.renderCheckboxRow = this.renderCheckboxRow.bind(this);
        this.showUnsubscribe = this.showUnsubscribe.bind(this);
        this.doUnsubscribe = this.doUnsubscribe.bind(this);        
        this.cancelUnsubscribe = this.cancelUnsubscribe.bind(this);

        this.state = {
            user: {},
            firstNameDisabled: true,
            lastNameDisabled: true,
            alertDialogShown: false
        };
    }

    componentDidMount() {
        this.props.actions.fetchTags();
        var token = this.props.userState.token

        if (token) {
            this.props.actions.getUser(token, function(data) {
                if (!data.success) {
                    ons.notification.alert({
                        title: 'Error!',
                        message: data.message,
                        cancelable: true
                    })
                }
            })
        }
        this.setState({
            user: this.props.userState.user
        })
    }

    renderLogin() {
        this.props.navigator.pushPage({component: LoginPage, key: 'LOGIN_PAGE'});
    }

    renderRegister() {
        this.props.navigator.pushPage({component: RegisterPage, key: 'REGISTER_PAGE'});
    }

    renderPassword() {
        this.props.navigator.pushPage({component: PasswordPage, key: 'PASSWORD_PAGE'});
    }

    handleInputChange(e) {
        const id = e.target.id
        this.state.user[id] = e.target.value;
    }

    handleSwitchChange(e) {
        //hack to get the id of the switch element, because inputId does not work
        const id = e.target.attributes['input-id'].value
        this.state.user[id] = e.target.checked;
        this.updateUser();
    }

    handleTagChange(e) {
        const id = e.target.id
        const checked = e.target.checked
        var tags = this.state.user.tags
        var newTags = tags.slice();
        var index = tags.indexOf(id)
        if (checked) {
            if (index == -1) {
                newTags.push(id);
            }
        } else {
            if (index != -1) {
                newTags.splice(index, 1);
            }
        }
        this.setState((previousState) => {
            previousState.user.tags = newTags;
            return previousState;
        });
        this.updateUser()
    }


    toggleFirstName() {
        var disabled = this.state.firstNameDisabled;
        if (!disabled) {
            this.updateUser();
            this.setState({firstNameDisabled: true})
        } else {
            this.setState({firstNameDisabled: false})
        }
    }

    toggleLastName() {
        var disabled = this.state.lastNameDisabled;
        if (!disabled) {
            this.updateUser()
            this.setState({lastNameDisabled: true})
        } else {
            this.setState({lastNameDisabled: false})
        }
    }

    updateUser() {
        var token = this.props.userState.token
        var user = this.state.user;
        //console.log(user);
        return this.props.actions.updateUser(token, user.firstName, user.lastName, user.notifyEmail, user.notifyMobile, user.tags, function(data) {
            if (!data.success) {
                ons.notification.alert({
                    title: 'Error!',
                    message: data.message,
                    cancelable: true
                })
            } else {
                //console.log('Succesfully updated user');
                ons.notification.alert({
                    title: 'User updated',
                    message: "Your profile has been updated",
                    cancelable: true
                })
            }
        });
    }
    
    showUnsubscribe() {
        this.setState({alertDialogShown: true});
    }
    
    doUnsubscribe() {
        
        this.setState({alertDialogShown: false});
        
        var token = this.props.userState.token
        var user = this.state.user;
        
        return this.props.actions.unsubscribeUser(token, user.firstName, user.lastName, user.tags, function(data) {
            if (!data.success) {
                ons.notification.alert({
                    title: 'Error!',
                    message: data.message,
                    cancelable: true
                })
            } else {                
                ons.notification.alert({
                    title: 'User unsubscribed',
                    message: "Thank you for having used the Zionalert app. You have now been unsubscribed.",
                    cancelable: true
                })
            }
        });
    }
    
    cancelUnsubscribe() {
        
        this.setState({alertDialogShown: false});
    }

    renderToolbar(title) {
        return <NavBar title="Profile" navigator={navigator}/>
    }

    renderCheckboxRow(tag) {
        var checked = false;
        var tags = this.state.user.tags
        if (tags) {
            checked = tags.includes(tag.id);
        }
        return (
            <ListItem key={tag.id} tappable>
                <label className='left'>
                    <Checkbox
                        inputId={tag.id}
                        onChange={this.handleTagChange}
                        checked={checked}
                    />
                </label>
                <label htmlFor={tag.id} className='center'>
                    {tag.name}
                </label>
            </ListItem>
        )
    }

    render() {
        var padding = {padding: '5px'};
        let token = this.props.userState.token;
        let user = this.props.userState.user;
        this.state.user = user;
        
        if (!token) {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding}>
                        <Button style={{margin: '6px'}} onClick={this.renderLogin} modifier='cta'>
                            Login
                        </Button>
                        <Button style={{margin: '6px'}} onClick={this.renderRegister} modifier='cta'>
                            Register
                        </Button>
                    </div>
                </Page>
            );
        } else {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding}>
                        <p>
                            Welcome {this.state.user.firstName} !
                        </p>
                        <Input
                            inputId='firstName'
                            onChange={this.handleInputChange}
                            modifier='underbar'
                            float
                            disabled={this.state.firstNameDisabled}
                            value={this.state.user.firstName} />
                        <Button modifier='quiet' onClick={this.toggleFirstName}>
                            <Icon icon='md-edit' />
                        </Button>
                        <br/>
                        <Input
                            inputId='lastName'
                            onChange={this.handleInputChange}
                            modifier='underbar'
                            float
                            disabled={this.state.lastNameDisabled}
                            value={user.lastName} />
                        <Button modifier='quiet' onClick={this.toggleLastName}>
                            <Icon icon='md-edit' />
                        </Button>
                        <p>
                            Receive alerts by email
                        </p>
                        <Switch
                            inputId='notifyEmail'
                            onChange={this.handleSwitchChange}
                            checked={this.state.user.notifyEmail}
                            float/>
                        <p>
                            Receive alert notifications
                        </p>
                        <Switch
                            inputId='notifyMobile'
                            onChange={this.handleSwitchChange}
                            checked={this.state.user.notifyMobile}
                            float />
                        <p>
                            Email verified
                        </p>
                        <Switch
                            disabled={true}
                            checked={this.state.user.emailVerified}
                            float />
                        <br/>
                         <Button style={{margin: '6px'}} onClick={this.renderPassword} modifier='cta'>
                            Change password
                        </Button>
                        <Button style={{margin: '6px'}} onClick={this.showUnsubscribe} modifier='cta'>
                            Unsubscribe
                        </Button>
                        <List
                          dataSource={this.props.tagsState.items}
                          renderHeader={() => <ListHeader>Categories</ListHeader>}
                          renderRow={this.renderCheckboxRow}
                        />                        
                        <AlertDialog
                            isOpen={this.state.alertDialogShown}
                            isCancelable={false}>
                            <div className='alert-dialog-title'>Warning!</div>
                                <div className='alert-dialog-content'>
                                    Are you sure you wish to unsubscribe ?
                                </div>
                            <div className='alert-dialog-footer'>
                                <button onClick={this.cancelUnsubscribe} className='alert-dialog-button'>
                                    Cancel
                                </button>
                                <button onClick={this.doUnsubscribe} className='alert-dialog-button'>
                                    Ok
                                </button>
                            </div>
                        </AlertDialog>
                    </div>
                </Page>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    userState: state.user,
    tagsState: state.tags
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)