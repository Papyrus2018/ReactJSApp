import React from 'react';
import {connect} from 'react-redux';


import {
    Page,
    List,
    ListItem
} from 'react-onsenui';

import NavBar from '../components/NavBar';


const convertDate = (inputFormat) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
};

const renderToolbar = (title) => (
    <NavBar title={title} navigator={navigator} backButton={true}/>
);

const renderRow = (tag) => (
    <li key={tag} style={styles.listitem}>
        {tag}
    </li>
);

const renderTags = (tags) => (
    <ul className="toolbar__left">
        {tags.map((tag) => renderRow(tag))}
    </ul>
);


const mapTags = (tags, alertTags) => {
    var tagNames = []
    tags.map((t) => {if (alertTags.includes(t.id)) tagNames.push(t.name)});
    return tagNames;
}

const styles = {
    content: {
        margin: '0px 20px'
    },
    listitem: {
        'display': 'inline-block',
        'margin': '0px 5px',
        'padding': '0 15px',
        'height': '30px',
        'font-size': '14px',
        'line-height': '30px',
        'border-radius': '15px',
        'background-color': '#f1f1f1'
    },
    date: {
        'display': 'float',
        'margin': '8px 5px',
        'display': 'inline-block',
        'padding': '0 15px',
        'height': '30px',
        'font-size': '14px',
        'line-height': '30px',
        'border-radius': '15px',
        'background-color': '#c0c0c0'
    }
}


const AlertPage = ({navigator, tags, alert}) => (
    <Page renderToolbar={renderToolbar.bind(this, alert.title)}>
        <div style={styles.content}>
            <div className="toolbar toolbar--transparent">
                {renderTags(mapTags(tags, alert.tags))}
                <div className="toolbar__center" style={{'margin':'0px'}}/>
                <div className="toolbar__right">
                    <div style={styles.date}>
                        {convertDate(alert.date)}
                    </div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: alert.content }}/>
        </div>
    </Page>
);


const mapStateToProps = (state) => ({
    tags: state.tags.items
});

export default connect(mapStateToProps)(AlertPage)