import { searchConstants } from '../constants';

const initialState = {};

export function search(state = initialState, action) {
    switch (action.type) {
        case searchConstants.SEARCH_REQUEST:
            return {
                ...state,
                searching: true,
                searchRequest: action
            };
        case searchConstants.SEARCH_SUCCESS:
            return {
                ...state,
                found: true,
                search: action.searchResult.data
            };
        case searchConstants.SEARCH_FAILURE:
            return {};
        case searchConstants.SEARCH_PAGE_REQUEST:
            return {
                ...state,
                page: {
                    sherching: true,
                    search: action
                }
            }
        case searchConstants.SEARCH_PAGE_SUCCESS:
            return {
                ...state,
                page: {
                    found: true,
                    search: action.searchResult.data
                }
            }
        case searchConstants.SEARCH_PAGE_FAILURE:
            return {}
        default:
            return state;
    }
}