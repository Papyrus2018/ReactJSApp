import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AlertList from '../containers/AlertList';
import BlogList from '../containers/BlogList';
import ProfilePage from '../containers/ProfilePage';
import ContactPage from '../containers/ContactPage';
import AboutPage from '../containers/AboutPage';

import * as Actions from '../actions';


import {
    Page,
    List,
    ListItem,
    ListTitle,
    Icon
} from 'react-onsenui';


const alerts = {component: AlertList, key: 'ALERT_LIST'}
const blogs = {component: BlogList, key: 'BLOG_LIST'}
const profile = {component: ProfilePage, key: 'PROFILE_PAGE'}
const contact = {component: ContactPage, key: 'CONTACT_PAGE'}
const about = {component: AboutPage, key: 'ABOUT_PAGE'}


const SideMenu = ({resetPage, actions}) => (
    <Page>
        <div>
            <img src='assets/logo.png'
            style={{
                'display': 'block',
                'maxWidth': '60%',
                'margin': '20px auto'
            }}/>
        </div>
        <ListTitle>Access</ListTitle>
        <List>
            <ListItem onClick={resetPage.bind(this, alerts, actions.hideMenu)}>
                <div className='left'>
                    <Icon fixed-width class='list-item__icon' icon='fa-exclamation'></Icon>
                </div>
                <div className='center'>
                    Alerts
                </div>
            </ListItem>
            <ListItem onClick={resetPage.bind(this, blogs, actions.hideMenu)}>
                <div className='left'>
                    <Icon fixed-width class='list-item__icon' icon='fa-files-o'></Icon>
                </div>
                <div className='center'>
                    Blog
                </div>
            </ListItem>
            <ListItem onClick={resetPage.bind(this, profile, actions.hideMenu)}>
                <div className='left'>
                    <Icon fixed-width class='list-item__icon' icon='fa-user'></Icon>
                </div>
                <div className='center'>
                    Profile
                </div>
            </ListItem>
        </List>
        <ListTitle style={{'marginTop': '10px'}}>Links</ListTitle>
        <List>
            <ListItem onClick={resetPage.bind(this, contact, actions.hideMenu)}>
                <div className='left'>
                    <Icon fixed-width class='list-item__icon' icon='fa-phone'></Icon>
                </div>
                <div className='center'>
                    Contact
                </div>
            </ListItem>
            <ListItem onClick={resetPage.bind(this, about, actions.hideMenu)}>
                <div className='left'>
                    <Icon fixed-width class='list-item__icon' icon='fa-info'></Icon>
                </div>
                <div className='center'>
                    About
                </div>
            </ListItem>            
        </List>
    </Page>
);



const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(SideMenu)
