import { libraryService } from '../../services';
// import { history } from '../../helpers';
import { libraryConstants } from '../constants';
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
                }
            );
    };

    function request(userId) { return { type: libraryConstants.LIBRARY_REQUEST, userId } }
    function success(userLibrary) { return { type: libraryConstants.LIBRARY_SUCCESS, userLibrary } }
    function failure(error) { return { type: libraryConstants.LIBRARY_FAILURE, error } }
}