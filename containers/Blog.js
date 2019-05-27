import React from 'react';

import BlogPage from './BlogPage';

import * as Actions from '../actions';

import {
    ListItem,
    Icon
} from 'react-onsenui';


const styles = {
    listitem: {
        'margin': '10px',
        'padding': '0px',
        'height': '60px',
    }
}

const pushPage = (navigator, blog) => {
    navigator.pushPage({component: BlogPage, key: 'BLOG_PAGE', props: {blog: blog}});
}

const Blog = ({blog, navigator}) => (
    <ListItem onClick={pushPage.bind(this, navigator, blog)} style={styles.listitem}>
        <div className='left'>
            {blog.title}
        </div>
    </ListItem>
);



export default Blog;