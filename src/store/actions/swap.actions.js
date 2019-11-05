import { swapService } from '../../services';
import { swapConstants } from '../constants';
import { alertActions } from './';

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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: swapConstants.SWAP_REQUEST, id } }
    function success(response) { return { type: swapConstants.SWAP_SUCCESS, response } }
    function failure(error) { return { type: swapConstants.SWAP_FAILURE, error } }
}