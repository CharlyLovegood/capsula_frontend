// import { searchService } from '../../services';
// import { alertActions } from './';
import { searchConstants } from '../constants';

export const searchActions = {
    request
};


function request(searchRequest) {
    return dispatch => {
        const folks = [
            {
              name: 'Alan Souza',
              imageUrl:
                'https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80'
            },
            {
              name: 'Bryan Jacquot',
              imageUrl:
                'https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80'
            },
            {
              name: 'Chris Carlozzi',
              imageUrl:
                'https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80'
            },
            {
              name: 'Eric Soderberg',
              imageUrl:
                'https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80'
            },
            {
              name: 'Marlon Parizzotto',
              imageUrl:
                'https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80'
            },
            {
              name: 'Tales Chaves',
              imageUrl:
                'https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80'
            },
            {
              name: 'Tracy Barmore',
              imageUrl:
                'https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80'
            }
          ];
        dispatch(success(folks));
    }


    // return dispatch => {
    //     dispatch(request(searchRequest));

    //     searchService.request(searchRequest)
    //         .then(
    //             searchResult => { 
    //                 dispatch(success(searchResult));
    //             },
    //             error => {
    //                 dispatch(failure(error));
    //                 dispatch(alertActions.error(error));
    //             }
    //         );
    // };

    // function request(searchRequest) { return { type: searchConstants.SEARCH_REQUEST, searchRequest } }
    function success(searchResult) { return { type: searchConstants.SEARCH_SUCCESS, searchResult } }
    // function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}