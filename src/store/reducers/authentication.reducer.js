import { userConstants } from '../constants';

let username = localStorage.getItem('username');
let firstName = localStorage.getItem('firstName');
let lastName = localStorage.getItem('lastName');
let avatar = localStorage.getItem('avatar') === 'null' ? null : localStorage.getItem('avatar');
let id = localStorage.getItem('id');
let location = localStorage.getItem('location');

const initialState = username ? { 
    loggedIn: true, 
    user: {
        username,
        firstName,
        lastName,
        avatar,
        location,
        id
    } 
} : {
    loggedIn: false, 
    user: {
        username: '',
        firstName: '',
        lastName: '',
        avatar: '',
        location: '',
        id: ''
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
                    location: action.user.location,
                    id: action.user.id
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
                    location: '',
                    id: ''
                }});
        case userConstants.LOGOUT:
            return ({
                loggedIn: false, 
                user: {
                    username: '',
                    firstName: '',
                    lastName: '',
                    avatar: '',
                    location: '',
                    id: ''
                }});
        case userConstants.EDIT_SUCCESS:
            return ({
                loggedIn: true, 
                user: {
                    ...state.user,
                    firstName: action.user.first_name,
                    lastName: action.user.last_name,
                    avatar: action.user.avatar,
                    location: action.user.location
                }});
        default:
            return state;
    }
}