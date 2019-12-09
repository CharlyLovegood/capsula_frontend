import { bookService, userService } from '../../services';
import { bookConstants, userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../../helpers';

export const bookActions = {
    getBook,
    deleteBookById,
    addBook,
    editBook,
    complainBook,
    clearBook
};


function getBook(bookId, currentPosition) {
    return dispatch => {
        dispatch(request({ bookId }));
        bookService.getBook(bookId, currentPosition)
            .then(
                book => { 
                    dispatch(success(book));
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

    function request(bookId) { return { type: bookConstants.GET_BOOK_REQUEST, bookId} }
    function success(book) { return { type: bookConstants.GET_BOOK_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.GET_BOOK_FAILURE, error } }
    function forceLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
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
                    dispatch(success(book, response.book.id, response.id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(book) { return { type: bookConstants.ADD_BOOK_REQUEST, book } }
    function success(book, abstractId, id) { return { type: bookConstants.ADD_BOOK_SUCCESS, book, id, abstractId } }
    function failure(error) { return { type: bookConstants.ADD_BOOK_FAILURE, error } }
}


function editBook(book, bookId) {
    return dispatch => {
        dispatch(request({ book }));
        bookService.editBook(book, bookId)
            .then(
                response => { 
                    dispatch(success(book, bookId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(book) { return { type: bookConstants.EDIT_BOOK_REQUEST, book } }
    function success(book, bookId) { return { type: bookConstants.EDIT_BOOK_SUCCESS, book, bookId } }
    function failure(error) { return { type: bookConstants.EDIT_BOOK_FAILURE, error } }
}


function complainBook(complaint) {
    return dispatch => {
        dispatch(request({ complaint }));
        bookService.complain(complaint.id, complaint.content, complaint.comment)
            .then(
                response => { 
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(complaint) { return { type: bookConstants.COMPLAIN_BOOK_REQUEST, complaint } }
    function success(response) { return { type: bookConstants.COMPLAIN_BOOK_SUCCESS, response } }
    function failure(error) { return { type: bookConstants.COMPLAIN_BOOK_FAILURE, error } }
}

function clearBook() {
    return dispatch => {
        dispatch(clear());
    };

    function clear() { return { type: bookConstants.BOOK_CLEAR } }
}