import { mapConstants } from './../constants/map.constants';

const initialState = {};

export function map(state=initialState, action) {
    switch (action.type) {
        case mapConstants.GET_MARKERS_REQUEST:
            return {
                requestingMap: true,
                map: []
            }
        case mapConstants.GET_MARKERS_SUCCESS:
            return {
                resievedMap: true,
                map: action.map
            }
        case mapConstants.GET_MARKERS_FAILURE:
            return {
                resievedMap: false,
                map: []
            }
        default:
            return state;
    }
}