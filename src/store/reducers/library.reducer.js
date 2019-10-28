import { libraryConstants, bookConstants } from './../constants';

const initialState = {};

export function library(state=initialState, action) {
    let userLibrary = [];
    switch (action.type) {
        case libraryConstants.LIBRARY_REQUEST:
            return {
                requestingUserLibray: true,
                userId: action.userId
            }
        case libraryConstants.LIBRARY_SUCCESS:
            return {
                userLibraryRecieved: true,
                userLibrary: action.userLibrary.data.data
            }
        case libraryConstants.LIBRARY_FAILURE:
            return {
                error: action.error
            }
        case bookConstants.DELETE_BOOK_SUCCESS:
            userLibrary = state.userLibrary;
            userLibrary = userLibrary.filter(function(item) {
                return item.id !== action.bookId
            })
            return {
                userLibrary: userLibrary,
                userLibraryRecieved: true
            }
        case bookConstants.ADD_BOOK_SUCCESS:
            userLibrary = state.userLibrary;
            const book = {
                'book': {
                    "title": action.book.title,
                    "authors": action.book.authors,
                    "genre": action.book.genre,
                    'id': action.abstractId
                },
                'image': action.book.image,
                'id': action.id,
            };
            userLibrary.push(book)
            return {
                userLibrary: userLibrary,
                userLibraryRecieved: true
            }
        default:
            return state;
    }
}