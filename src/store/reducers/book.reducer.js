import { bookConstants } from './../constants/book.constants';

const initialState = {};

export function book(state=initialState, action) {
    switch (action.type) {
        case bookConstants.GET_BOOK_REQUEST:
            return {
                requestingBook: true,
                bookId: action.bookId
            }
        case bookConstants.GET_BOOK_SUCCESS:
            return {
                bookRecieved: true,
                book: action.book
            }
        case bookConstants.GET_BOOK_FAILURE:
            return {}
        case bookConstants.BOOK_CLEAR:
            return {}
        default:
            return state;
    }
}