import { libraryService, userService } from '../../services';
import { history } from '../../helpers';
import { libraryConstants, userConstants } from '../constants';
import { alertActions } from './';

export const libraryActions = {
    getBookListById
};

function getBookListById(userId) {
    return dispatch => {
        dispatch(request({ userId }));

        libraryService.getBookListById(userId)
            .then(
                userLibrary => { 
                    dispatch(success(userLibrary));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    if (error.response.status === 401) {
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        userService.forceLogout();
                        history.push('/login');
                    }
                }
            );
    };


    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
    function request(userId) { return { type: libraryConstants.LIBRARY_REQUEST, userId } }
    function success(userLibrary) { return { type: libraryConstants.LIBRARY_SUCCESS, userLibrary } }
    function failure(error) { return { type: libraryConstants.LIBRARY_FAILURE, error } }
}


