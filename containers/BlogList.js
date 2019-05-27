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
import Blog from './Blog';


class BlogList extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchBlogList();
    }

    renderToolbar() {
        return <NavBar title='Blog' navigator={this.props.navigator} />
    }

    renderRow(blog) {
        return <Blog key={blog.title} navigator={this.props.navigator} blog={blog} />
    }

    handleLoad(done) {
        this.props.actions.fetchBlogList(done)
    }

    render () {
         if (this.props.blogs.SSLMessage == "OK") {
                return (
                    <Page renderToolbar={this.renderToolbar}>
                        <PullHook onLoad={this.handleLoad}>
                            <ProgressCircular indeterminate/>
                        </PullHook>
                        <List
                            dataSource={this.props.blogs.items}
                            renderRow={this.renderRow}
                        />                
                    </Page>
                );
         } else {
            var padding = {padding: '5px'};
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div style={padding} dangerouslySetInnerHTML={{ __html: this.props.blogs.SSLMessage }}/>
                </Page>
            );
        }
    }

};

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)