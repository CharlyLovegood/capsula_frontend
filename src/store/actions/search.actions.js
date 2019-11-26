import { searchService } from '../../services';
import { alertActions } from './';
import { searchConstants } from '../constants';

export const searchActions = {
    request,
    requestPage,
    search
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


function search(query, page, genre) {
    return dispatch => {
        dispatch(request());

        searchService.search(query, page, genre)
            .then(
                searchResult => { 
                    console.log(searchResult)
                    dispatch(success(searchResult));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: searchConstants.SEARCH_REQUEST } }
    function success(searchResult) { return { type: searchConstants.SEARCH_SUCCESS, searchResult } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}


function requestPage(page) {

    return dispatch => {
        dispatch(request(page));

        searchService.requestPage(page)
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

    function request(page) { return { type: searchConstants.SEARCH_PAGE_REQUEST, page } }
    function success(searchResult) { return { type: searchConstants.SEARCH_PAGE_SUCCESS, searchResult } }
    function failure(error) { return { type: searchConstants.SEARCH_PAGE_FAILURE, error } }
}