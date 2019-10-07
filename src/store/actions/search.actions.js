import { searchService } from '../../services';
import { searchConstants } from '../constants';
import { alertActions } from './';

export const searchActions = {
    request
};


function request(searchRequest) {
    return dispatch => {
        dispatch(request(searchRequest));

        searchService.request(searchRequest)
            .then(
                searchResult => { 
                    dispatch(success(searchResult));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(searchRequest) { return { type: searchConstants.SEARCH_REQUEST, searchRequest } }
    function success(searchResult) { return { type: searchConstants.SEARCH_SUCCESS, searchResult } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}