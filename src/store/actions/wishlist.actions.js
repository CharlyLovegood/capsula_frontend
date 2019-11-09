import { wishlistService, userService } from '../../services';
import { wishlistConstants, userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../../helpers';

export const wishlistActions = {
    getWishlist,
    deleteFromWishlist,
    addToWishlist
};


function getWishlist() {
    return dispatch => {
        dispatch(request());

        wishlistService.getWishlist()
            .then(
                wishlist => { 
                    dispatch(success(wishlist));
                },
                error => {
                    dispatch(failure(error.response.statusText));
                    dispatch(alertActions.error(error.response.statusText));
                    if (error.response.status === 401) {
                        userService.forceLogout();
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        history.push('/login');
                    }
                }
            );
    };

    function request() { return { type: wishlistConstants.GET_WISHLIST_REQUEST } }
    function success(wishlist) { return { type: wishlistConstants.GET_WISHLIST_SUCCESS, wishlist } }
    function failure(error) { return { type: wishlistConstants.GET_WISHLIST_FAILURE, error } }
    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}


function deleteFromWishlist(id) {
    return dispatch => {
        dispatch(request(id));

        wishlistService.deleteFromWishlist(id)
            .then(
                response => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: wishlistConstants.DELETE_FROM_WISHLIST_REQUEST, id } }
    function success(id) { return { type: wishlistConstants.DELETE_FROM_WISHLIST_SUCCESS, id } }
    function failure(error) { return { type: wishlistConstants.DELETE_FROM_WISHLIST_FAILURE, error } }
}


function addToWishlist(book, id) {
    return dispatch => {
        dispatch(request(id));

        wishlistService.addToWishlist(id)
            .then(
                response => { 
                    dispatch(success(book, response.id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: wishlistConstants.ADD_TO_WISHLIST_REQUEST, id } }
    function success(book, id) { return { type: wishlistConstants.ADD_TO_WISHLIST_SUCCESS, book, id } }
    function failure(error) { return { type: wishlistConstants.ADD_TO_WISHLIST_FAILURE, error } }
}