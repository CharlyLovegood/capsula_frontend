import { bookService } from '../../services';
import { bookConstants } from '../constants';
import { alertActions } from './';

export const bookActions = {
    getBook
};


function getBook(bookId) {
    return dispatch => {
        dispatch(request({ bookId }));

        bookService.getBook(bookId)
            .then(
                book => { 
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(bookId) { return { type: bookConstants.GET_BOOK_REQUEST, bookId} }
    function success(book) { return { type: bookConstants.GET_BOOK_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.GET_BOOK_FAILURE, error } }
}