import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';


import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon
} from 'react-onsenui';


const renderBackButton = (navigator) => (
    <BackButton onClick={navigator.popPage}>Back</BackButton>
);

const NavBar = ({title, navigator, backButton, actions}) => (
    <Toolbar>
        <div className='left'>
            {backButton ? renderBackButton(navigator) : null}
        </div>
        <div className='center'>{title}</div>
        <div className='right'>
            <ToolbarButton onClick={actions.showMenu}>
                <Icon icon='md-menu' />
            </ToolbarButton>
        </div>
    </Toolbar>
);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(NavBar)