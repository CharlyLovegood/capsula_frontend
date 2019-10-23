import { bookService } from '../../services';
import { bookConstants } from '../constants';
import { alertActions } from './';

export const bookActions = {
    getBook,
    deleteBookById,
    addBook
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

function deleteBookById(bookId) {
    return dispatch => {
        dispatch(request({ bookId }));

        bookService.deleteBook(bookId)
            .then(
                response => { 
                    dispatch(success(bookId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(bookId) { return { type: bookConstants.DELETE_BOOK_REQUEST, bookId } }
    function success(bookId) { return { type: bookConstants.DELETE_BOOK_SUCCESS, bookId } }
    function failure(error) { return { type: bookConstants.DELETE_BOOK_FAILURE, error } }
}

function addBook(book) {
    return dispatch => {
        dispatch(request({ book }));

        bookService.addBook(book)
            .then(
                response => { 
                    console.log(response)
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(book) { return { type: bookConstants.ADD_BOOK_REQUEST, book } }
    function success(book) { return { type: bookConstants.ADD_BOOK_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.ADD_BOOK_FAILURE, error } }
}