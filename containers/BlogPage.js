import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

import {
    Page
} from 'react-onsenui';

import NavBar from '../components/NavBar';


class BlogPage extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
    }

    componentDidMount() {
        const id = this.props.blog.id
        this.props.actions.fetchBlog(id);
    }

    renderToolbar(title) {
        return <NavBar title={this.props.blog.title} navigator={navigator} backButton={true}/>
    }

    render() {
        var padding = {padding: '5px'};
        if (this.props.blogState.SSLMessage == "OK") {
            let id = this.props.blog.id
            let content = this.props.blogState.dict[id]
            console.log(content)
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding} dangerouslySetInnerHTML={{ __html: content }}/>
                </Page>
            );
        } else {            
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding} dangerouslySetInnerHTML={{ __html: this.props.blogState.SSLMessage }}/>
                </Page>
            );
        } 
    }
}

const mapStateToProps = (state) => ({
    blogState: state.blog
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)