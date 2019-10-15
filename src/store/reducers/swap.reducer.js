import { swapConstants } from './../constants/swap.constants';

const initialState = {};

export function swap(state=initialState, action) {
    switch (action.type) {
        case swapConstants.GET_REQUESTS_REQUEST:
            return {
                requestingRequests: true,
                userId: action.userId
            }
        case swapConstants.GET_REQUESTS_SUCCESS:
            return {
                requestsRecieved: true,
                requestsList: action.requestsList
            }
        case swapConstants.GET_REQUESTS_FAILURE:
            return {}
        case swapConstants.GET_PROPOSALS_REQUEST:
            return {

            }
        case swapConstants.GET_PROPOSALS_SUCCESS:
            return {

            }
        case swapConstants.GET_PROPOSALS_FAILURE:
            return {}   
        case swapConstants.GET_IN_PROCESS_REQUEST:
            return {

            }
        case swapConstants.GET_IN_PROCESS_SUCCESS:
            return {

            }
        case swapConstants.GET_IN_PROCESS_FAILURE:
            return {}
        case swapConstants.GET_ON_HANDS_REQUEST:
            return {

            }
        case swapConstants.GET_ON_HANDS_SUCCESS:
            return {

            }
        case swapConstants.GET_ON_HANDS_FAILURE:
            return {}
        default:
            return state;
    }
}