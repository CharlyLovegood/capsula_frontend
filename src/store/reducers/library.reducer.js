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
                userLibrary: action.userLibrary.data
            }
        case libraryConstants.LIBRARY_FAILURE:
            return {
                error: action.error
            }
        case libraryConstants.DELETE_BOOK_SUCCESS:
            let userLibrary = state.userLibrary;
            console.log(userLibrary)
            userLibrary = userLibrary.filter(function(item) {
                console.log(action.bookId)
                return item.id !== action.bookId
            })
            return {
                userLibrary: userLibrary,
                userLibraryRecieved: true
            }
        default:
            return state;
    }
}