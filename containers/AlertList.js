import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

import {
    List,
    Page,
    PullHook,
    ProgressCircular
} from 'react-onsenui';


import NavBar from '../components/NavBar';
import Alert from './Alert';


class AlertList extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchAlerts();
    }

    renderToolbar() {
        return <NavBar title='Alerts' navigator={this.props.navigator} />
    }

    renderRow(alert) {
        return <Alert key={alert._id} navigator={this.props.navigator} alert={alert} />
    }

    handleLoad(done) {
        this.props.actions.fetchAlerts(done)
    }


    render () {
        if (this.props.alerts.SSLMessage == "OK") {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <PullHook onLoad={this.handleLoad}>
                        <ProgressCircular indeterminate/>
                    </PullHook>
                    <List
                        dataSource={this.props.alerts.items}
                        renderRow={this.renderRow}
                    />
                </Page>
            );
        } else {
            var padding = {padding: '5px'};
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding} dangerouslySetInnerHTML={{ __html: this.props.alerts.SSLMessage }}/>
                </Page>
            );
        }
    }
};

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertList)