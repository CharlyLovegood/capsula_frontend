import { userService } from '../../services';
import { history } from '../../helpers';
import { userConstants } from '../constants';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
    getById,
    editUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}


function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
            .then(
                user => {
                    dispatch(success(user.data));
                    dispatch(alertActions.success('UserPage Load successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(userId) { return { type: userConstants.USERPAGE_REQUEST, userId } }
    function success(user) { return { type: userConstants.USERPAGE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USERPAGE_FAILURE, error } }
}


function editUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.editUser(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('User edit success'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.EDIT_REQUEST, user } }
    function success(user) { return { type: userConstants.EDIT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error } }
}