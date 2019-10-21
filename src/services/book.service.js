import * as axios from "axios";
import { back_url } from './../helpers';

export const bookService = {
    getBook,
    deleteBook,
    addBook
};

function getBook(id) {
    const requestOptions = {
        method: 'GET',
        url: back_url.books.get_book(id),
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

    return fetch(back_url.books.delete_book(id), requestOptions)
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

    return fetch(back_url.books.add_book, requestOptions)
        .then(
            response => {
                console.log(response);
                return response;
            });
}