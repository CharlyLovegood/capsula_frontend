import { userConstants } from '../constants';

let username = localStorage.getItem('username');
let firstName = localStorage.getItem('firstName');
let lastName = localStorage.getItem('lastName');
let avatar = localStorage.getItem('avatar');
let id = localStorage.getItem('id');

const initialState = username ? { 
    loggedIn: true, 
    user: {
        username,
        firstName,
        lastName,
        avatar,
        id
    } 
} : {};

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
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}