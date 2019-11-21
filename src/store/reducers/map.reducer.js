import { mapConstants } from './../constants/map.constants';

const initialState = {
    map: []
};

export function map(state=initialState, action) {
    let map = state;
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
        case mapConstants.ADD_MARKER_SUCCESS:
            map = state;
            map.map.push(action.marker);
            return {
                resievedMap: true,
                map: map.map
            }
        case mapConstants.DELETE_MARKER_SUCCESS:
            map = state;
            map.map.filter(el => {
                return el.id !== action.id
            })
            return {
                resievedMap: true,
                map: map.map
            }
        default:
            return state;
    }
}