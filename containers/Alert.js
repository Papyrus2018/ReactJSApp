import React from 'react';

import AlertPage from './AlertPage';


import {
    ListItem,
    Icon
} from 'react-onsenui';


const alertColor = (alert) => {
    var color;
    switch (alert.severity) {
        case 'critical':
            color = 'DarkRed'
            break;
        case 'high':
            color = 'Red'
            break;
        case 'medium':
            color = 'DarkOrange'
            break;
        case 'low':
            color = 'Gold'
            break;
        default:
            color = 'Black'
    }
    return color;
}

const pushPage = (navigator, alert) => {
    navigator.pushPage({component: AlertPage, key: 'ALERT_PAGE', props: {alert: alert}});
}
const Alert = ({alert, navigator}) => (
    <ListItem onClick={pushPage.bind(this, navigator, alert)}>
        <div className='left'>
            <Icon style={{color: alertColor(alert)}}  fixed-width class='list-item__icon' icon='fa-exclamation-triangle'></Icon>
        </div>
        <div className='center'>
            {alert.title}
        </div>
    </ListItem>
);

export default Alert;