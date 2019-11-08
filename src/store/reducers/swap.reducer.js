import { swapConstants } from './../constants/swap.constants';

const initialState = {};

export function swap(state=initialState, action) {
    switch (action.type) {
        case swapConstants.GET_SWAP_REQUEST:
            return {
                requestingSwaps: true,
                userId: action.userId
            }
        case swapConstants.GET_SWAP_SUCCESS:
            return {
                swapsRecieved: true,
                swapsList: action.swapsList
            }
        case swapConstants.GET_SWAP_FAILURE:
            return {}
        case swapConstants.CHANGE_STATUS_SUCCESS:
            let swapsList = state.swapsList;
            swapsList.owner = swapsList.owner.map(el => {
                if (el.id === action.id) {
                    el.status = action.status;
                    return el;
                }
                return el;
            });
            swapsList.reader = swapsList.reader.map(el => {
                if (el.id === action.id) {
                    el.status = action.status;
                    return el;
                }
                return el;
            });
            return {
                swapsRecieved: true,
                swapsList: swapsList
            }
        default:
            return state;
    }
}