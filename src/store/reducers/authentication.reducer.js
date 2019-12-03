import { userConstants } from '../constants';

let username = localStorage.getItem('username');
let firstName = localStorage.getItem('firstName');
let lastName = localStorage.getItem('lastName');
let avatar = localStorage.getItem('avatar') === 'null' ? null : localStorage.getItem('avatar');
let id = localStorage.getItem('id');
let vk = localStorage.getItem('vk');
let notification = localStorage.getItem('notification');


const initialState = username ? { 
    loggedIn: true, 
    user: {
        username,
        firstName,
        lastName,
        avatar,
        id,
        vk,
        notification
    } 
} : {
    loggedIn: false, 
    user: {
        username: '',
        firstName: '',
        lastName: '',
        avatar: '',
        id: '',
        vk: '',
        notification: ''
    } 
};


export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: {    
                    username: action.user.django_user.username,
                    firstName: action.user.first_name,
                    lastName: action.user.last_name,
                    avatar: action.user.avatar,
                    id: action.user.id,
                    vk: action.user.contact,
                    notification: action.user.notification
                } 
            };
        case userConstants.LOGIN_FAILURE:
            return ({
                loggedIn: false, 
                user: {
                    username: '',
                    firstName: '',
                    lastName: '',
                    avatar: '',
                    id: '',
                    vk: '',
                    notification: ''
                }});
        case userConstants.OAUTH_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.OAUTH_SUCCESS:
            return {
                loggedIn: true,
                user: {    
                    username: action.user.django_user.username,
                    firstName: action.user.first_name,
                    lastName: action.user.last_name,
                    avatar: action.user.avatar,
                    id: action.user.id,
                    vk: action.user.contact,
                    notification: action.user.notification
                } 
            };
        case userConstants.OAUTH_FAILURE:
            return ({
                loggedIn: false, 
                user: {
                    username: '',
                    firstName: '',
                    lastName: '',
                    avatar: '',
                    id: '',
                    vk: '',
                    notification: ''
                }});
        case userConstants.LOGOUT_SUCCESS:
            return ({
                loggedIn: false, 
                user: {
                    username: '',
                    firstName: '',
                    lastName: '',
                    avatar: '',
                    id: '',
                    vk: '',
                    notification: ''
                }});
        case userConstants.LOGOUT_FAILURE:
            return ({
                loggedIn: false, 
                user: {
                    username: '',
                    firstName: '',
                    lastName: '',
                    avatar: '',
                    id: '',
                    vk: '',
                    notification: ''
                }});
        case userConstants.EDIT_SUCCESS:
            return ({
                loggedIn: true, 
                user: {
                    ...state.user,
                    firstName: action.user.first_name,
                    lastName: action.user.last_name,
                    avatar: action.user.image ? action.user.image : state.user.avatar,
                    vk: action.user.vk,
                    notification: action.user.notification ? action.user.notification : state.user.notification
                }});
        default:
            return state;
    }
}