import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

import {
    Page
} from 'react-onsenui';

import NavBar from '../components/NavBar';


class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
    }

    renderToolbar(title) {
        return <NavBar title={"About"} navigator={navigator} backButton={false}/>
    }

    render() {
       var padding = {padding: '5px'};
       var htmlText = `
        <p><strong>OUR COMPANY</strong></p>
        <p>
        We are web and application security experts. A bunch of experienced and driven ethical hackers and software security experts, based in Rotselaar near Leuven. Founded in 2005 by Erwin Geirnaert and Jessica Nieuwdorp, joined Securelink Group in 2016 for a majority of the shares. Our mission is to secure our customers digital assets (web, mobile, IoT, cloud, api,..) from hackers, bad-bots and other malicious exploits.
        </p>
        <p><strong>ZIONALERT APP</strong></p>        
        <p>
        The main feature of the app is to notify you of important web security vulnerabilities. As soon as a new security risk is detected, we will send you an <b>alert</b> to bring the issue to your attention and provide information on how to protect your business.
        </p>
        <p>
        You can also create a personal <b>profile</b>, choose what topics you wish to receive alerts for and opt for in-app and email alert notifications.
        </p>
        <p>
        Additionally, our mobile app allows you to read our <b>blog</b> posts on web and cyber security related topics.
        </p>
        <p>
        If you have specific web security questions you can also <b>contact</b> us via the app to ask our advice or consult our services.
        </p>
        <p><strong>GDPR</strong></p>
        <p>
        If you register an account, we ask for your e-mail address and name. We do not use this information for any other purposes than to send you security alerts. You may at any time choose to unsubscribe, and your e-mail and name will be removed from our databases.
        </p>
        `;
       return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={padding} dangerouslySetInnerHTML={{ __html: htmlText }}/>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)