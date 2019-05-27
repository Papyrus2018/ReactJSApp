import {combineReducers} from 'redux';
import alerts from './alerts';
import blog from './blog';
import blogs from './blogs';
import tags from './tags';
import ui from './ui';
import user from './user';
import contact from './contact';


const reducers = combineReducers({
    ui,
    alerts,
    blog,
    blogs,
    tags,
    user,
    contact
});

export default reducers;