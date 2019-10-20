import { swapService } from '../../services';
import { swapConstants } from '../constants';
import { alertActions } from './';

export const swapActions = {
    getSwapRequests,
    getSwapProposals,
    getInProcessSwaps,
    getOnHandsSwaps
};


function getSwapRequests() {
    return dispatch => {
        dispatch(request());

        swapService.getSwapRequests()
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

    function request() { return { type: swapConstants.GET_REQUESTS_REQUEST } }
    function success(swapList) { return { type: swapConstants.GET_REQUESTS_SUCCESS, swapList } }
    function failure(error) { return { type: swapConstants.GET_REQUESTS_FAILURE, error } }
}


function getSwapProposals() {
    return dispatch => {
        dispatch(request());

        swapService.getSwapProposals()
            .then(
                swapList => { 
                    dispatch(success(swapList));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: swapConstants.GET_PROPOSALS_REQUEST } }
    function success(swapList) { return { type: swapConstants.GET_PROPOSALS_SUCCESS, swapList } }
    function failure(error) { return { type: swapConstants.GET_PROPOSALS_FAILURE, error } }
}


function getInProcessSwaps() {
    return dispatch => {
        dispatch(request());

        swapService.getInProcessSwaps()
            .then(
                swapList => { 
                    dispatch(success(swapList));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: swapConstants.GET_IN_PROCESS_REQUEST } }
    function success(swapList) { return { type: swapConstants.GET_IN_PROCESS_SUCCESS, swapList } }
    function failure(error) { return { type: swapConstants.GET_IN_PROCESS_FAILURE, error } }
}


function getOnHandsSwaps() {
    return dispatch => {
        dispatch(request());

        swapService.getOnHandsSwaps()
            .then(
                swapList => { 
                    dispatch(success(swapList));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: swapConstants.GET_ON_HANDS_REQUEST } }
    function success(swapList) { return { type: swapConstants.GET_ON_HANDS_SUCCESS, swapList } }
    function failure(error) { return { type: swapConstants.GET_ON_HANDS_FAILURE, error } }
}