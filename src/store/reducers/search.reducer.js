import { searchConstants } from '../constants';

const initialState = {};

export function search(state = initialState, action) {
    switch (action.type) {
        case searchConstants.SEARCH_REQUEST:
            return {
                searching: true,
                searchRequest: action
            };
        case searchConstants.SEARCH_SUCCESS:
            return {
                found: true,
                search: action
            };
        case searchConstants.SEARCH_FAILURE:
            return {};
        default:
            return state;
    }
}