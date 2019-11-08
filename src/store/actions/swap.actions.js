import { swapService, userService } from '../../services';
import { swapConstants, userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../../helpers';



export const swapActions = {
    getSwap,
    changeSwapStatus,
    swapRequest
};

function getSwap() {
    return dispatch => {
        dispatch(request());

        swapService.getSwap()
            .then(
                swapList => { 
                    dispatch(success(swapList.data));
                },
                error => {
                    if (error.response.status === 401) {
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        userService.forceLogout();
                        history.push('/login');
                    } else {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                }
            );
    };

    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }

    function request() { return { type: swapConstants.GET_SWAP_REQUEST } }
    function success(swapsList) { return { type: swapConstants.GET_SWAP_SUCCESS, swapsList } }
    function failure(error) { return { type: swapConstants.GET_SWAP_FAILURE, error } }
}

function changeSwapStatus(id, status) {
    return dispatch => {
        dispatch(request(status, id));

        swapService.changeSwapStatus(id, status)
            .then(
                response => { 
                    dispatch(success(response, id, status));
                },
                error => {
                    if (error.response.status === 401) {
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        userService.forceLogout();
                        history.push('/login');
                    } else {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                }
            );
    };

    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }

    function request(status, id) { return { type: swapConstants.CHANGE_STATUS_REQUEST, status, id } }
    function success(response, id, status) { return { type: swapConstants.CHANGE_STATUS_SUCCESS, response, id, status } }
    function failure(error) { return { type: swapConstants.CHANGE_STATUS_FAILURE, error } }
}

function swapRequest(id) {
    return dispatch => {
        dispatch(request(id));

        swapService.swapRequest(id)
            .then(
                response => { 
                    dispatch(success(response));
                },
                error => {
                    if (error.response.status === 401) {
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        userService.forceLogout();
                        history.push('/login');
                    } else {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));       
                    }
                }
            );
    };

    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }

    function request(id) { return { type: swapConstants.SWAP_REQUEST, id } }
    function success(response) { return { type: swapConstants.SWAP_SUCCESS, response } }
    function failure(error) { return { type: swapConstants.SWAP_FAILURE, error } }
}