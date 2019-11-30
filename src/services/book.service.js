import * as axios from "axios";
import { back_url } from './../helpers';

export const bookService = {
    getBook,
    deleteBook,
    addBook,
    editBook,
    complain
};


function getBook(id, currentPosition) {
    const url = currentPosition ? back_url.books.get_book(id)+`?longitude=${currentPosition.longitude}&latitude=${currentPosition.latitude}` : back_url.books.get_book(id);

    const requestOptions = {
        method: 'GET',
        url: url,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    
    return axios(requestOptions)
        .then(response => handleResponse(response))
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
        .then(handleResponse)
        .then(
            response => {
                return response;
            });
}



function editBook(book, id) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    };

    return fetch(back_url.books.delete_book(id), requestOptions)
        .then(handleResponse)
        .then(
            response => {
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
        .then(handlePostResponse)
        .then(
            response => {
                return response.json();
            })
}



function complain(book, content, comment) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ book, content, comment }),
        headers: {'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.token}
    };

    return fetch(back_url.management.book_complain, requestOptions)
        .then(handlePostResponse)
        .then(response => {
            return response;
        });
}



function handlePostResponse(response) {
    if (response.status !== 200) {
        return response.text().then(text => {
            const data = JSON.parse(text);
            const error = data.detail || data.msg;
            return Promise.reject(error);
        });
    }
    return response;
}


function handleResponse(response) {
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response;
}
