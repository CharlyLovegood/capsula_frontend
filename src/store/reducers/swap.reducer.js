import { swapConstants } from './../constants/swap.constants';

const initialState = {};

export function swap(state=initialState, action) {
    switch (action.type) {
        case swapConstants.GET_SWAP_REQUEST:
            return {
                requestingRequests: true,
                userId: action.userId
            }
        case swapConstants.GET_SWAP_SUCCESS:
            return {
                requestsRecieved: true,
                requestsList: action.swapList
            }
        case swapConstants.GET_SWAP_FAILURE:
            return {}
        default:
            return state;
    }
}