import { swapService } from '../../services';
import { swapConstants } from '../constants';
import { alertActions } from './';

export const swapActions = {
    getSwap
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
    function success(swapList) { return { type: swapConstants.GET_SWAP_SUCCESS, swapList } }
    function failure(error) { return { type: swapConstants.GET_SWAP_FAILURE, error } }
}