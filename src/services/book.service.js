import * as axios from "axios";

export const bookService = {
    getBook,
    deleteBook
};

function getBook(id) {
    const requestOptions = {
        method: 'GET',
        url: '/library/book_items/' + id + '/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    return axios(requestOptions)
        .then(book => {
            return book;
        }); 
}

function deleteBook(id) {
    console.log(id);
      
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