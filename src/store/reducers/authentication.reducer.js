import { userConstants } from '../constants';

// let user = localStorage.getItem('user');
// const initialState = user ? { loggedIn: true, user } : {};

const initialState = {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            console.log('store updated');
            console.log(action);
            return state;
    }
}