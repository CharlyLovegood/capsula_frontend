import { libraryConstants } from './../constants/library.constants';

const initialState = {};

export function library(state=initialState, action) {
    switch (action.type) {
        case libraryConstants.LIBRARY_REQUEST:
            return {
                requestingUserLibray: true,
                userId: action.userId
            }
        case libraryConstants.LIBRARY_SUCCESS:
            return {
                userLibraryRecieved: true,
                userLibrary: action.userLibrary
            }
        case libraryConstants.LIBRARY_FAILURE:
            return {
                error: action.error
            }
        default:
            return state;
    }
}