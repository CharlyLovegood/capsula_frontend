import { userService } from '../../services';
import { history } from '../../helpers';
import { userConstants } from '../constants';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
    getById,
    editUser,
    oauth,
    complainUser
};


function oauth() {
    return dispatch => {
        dispatch(request());

        userService.oauth()
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.response.statusText));
                    dispatch(alertActions.error(error.response.statusText));
                }
            );
    };

    function request() { return { type: userConstants.OAUTH_REQUEST } }
    function success(user) { return { type: userConstants.OAUTH_SUCCESS, user } }
    function failure(error) { return { type: userConstants.OAUTH_FAILURE, error } }
}



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
    return dispatch => {
    userService.logout()            
        .then(
            user => { 
                dispatch(success());
                history.push('/login');
                dispatch(alertActions.success('Successful logout'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error('Token expired'));
                history.push('/login');
                userService.forceLogout();
            }
        );
    } 
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
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
                er => {
                    let error = '';
                    if (er.response) {
                        error = er.response.statusText
                    }
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


function complainUser(complaint) {
    return dispatch => {
        dispatch(request({ complaint }));
        userService.complain(complaint.id, complaint.content, complaint.comment)
            .then(
                response => { 
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(complaint) { return { type: userConstants.COMPLAIN_USER_REQUEST, complaint } }
    function success(response) { return { type: userConstants.COMPLAIN_USER_SUCCESS, response } }
    function failure(error) { return { type: userConstants.COMPLAIN_USER_FAILURE, error } }
}