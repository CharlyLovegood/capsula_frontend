import * as axios from "axios";

export const bookService = {
    getBook,
    deleteBook,
    addBook
};

function getBook(id) {
    const requestOptions = {
        method: 'GET',
        url: '/library/books/' + id + '/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    return axios(requestOptions)
        .then(book => {
            return book;
        }); 
}

function deleteBook(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return fetch(`/library/book_items/${id}/`, requestOptions)
        .then(
            response => {
                console.log(response);
                return response;
            });
}

function addBook(book) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    };

    return fetch('/library/book_items/', requestOptions)
        .then(
            response => {
                console.log(response);
                return response;
            });
}