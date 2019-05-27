import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

import {
    Navigator,
    Page,
    Splitter,
    SplitterSide,
    SplitterContent
} from 'react-onsenui';

import SideMenu from '../components/SideMenu';

var navigator;

const renderPage = (route, _navigator) => {
    navigator = _navigator;
    return <route.component key={route.key} {...route.props} navigator={navigator} />
};

const resetPage = (view, hideMenu) => {
    hideMenu();
    navigator.resetPage(view, {animation:'none'})
};


const MainPage = ({initialPage, menu, actions}) => (
    <Splitter>
        <SplitterSide
            side='right'
            width={200}
            collapse={true}
            swipeable={true}
            isOpen={menu}
            onClose={actions.hideMenu}
            onOpen={actions.showMenu}
        >
            <SideMenu resetPage={resetPage}/>
        </SplitterSide>
        <SplitterContent>
            <Navigator
                renderPage={renderPage}
                initialRoute={initialPage}
            />
        </SplitterContent>
    </Splitter>
);


const mapStateToProps = (state) => ({
    menu: state.ui.menu,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

