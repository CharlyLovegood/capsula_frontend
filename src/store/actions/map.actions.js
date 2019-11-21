import { mapService, userService } from '../../services';
import { mapConstants, userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../../helpers';

export const mapActions = {
    getMarkersList,
    deleteMarker,
    addMarker
};


function getMarkersList() {
    return dispatch => {
        dispatch(request());

        mapService.getMarkersList()
            .then(
                map => { 
                    dispatch(success(map));
                },
                error => {
                    if (error.response.status === 401) {
                        userService.forceLogout();
                        dispatch(forceLogout(error));
                        dispatch(alertActions.error('Token expired'));
                        history.push('/login');
                    } else {
                        dispatch(failure(error.response.statusText));
                        dispatch(alertActions.error(error.response.statusText));
                    }
                }
            );
    };

    function request() { return { type: mapConstants.GET_MARKERS_REQUEST } }
    function success(map) { return { type: mapConstants.GET_MARKERS_SUCCESS, map } }
    function failure(error) { return { type: mapConstants.GET_MARKERS_FAILURE, error } }
    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}

function deleteMarker(id) {
    return dispatch => {
        dispatch(request({ id }));

        mapService.deleteMarker(id)
            .then(
                response => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: mapConstants.DELETE_MARKER_REQUEST, id } }
    function success(id) { return { type: mapConstants.DELETE_MARKER_SUCCESS, id } }
    function failure(error) { return { type: mapConstants.DELETE_MARKER_FAILURE, error } }
}


function addMarker(marker) {
    return dispatch => {
        dispatch(request({marker}));

        mapService.addMarker(marker)
            .then(
                response => { 
                    console.log(response)
                    // dispatch(success(marker, response.map.id, response.id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(marker) { return { type: mapConstants.ADD_MARKER_REQUEST, marker } }
    // function success(marker, abstractId, id) { return { type: mapConstants.ADD_MARKER_SUCCESS, map, id, abstractId } }
    function failure(error) { return { type: mapConstants.ADD_MARKER_FAILURE, error } }
}