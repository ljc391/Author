import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import user from './user';
import isLoggedIn from './isLoggedIn';
export default combineReducers({ users, stories, user , isLoggedIn});