import * as axios from "axios";

export const bookService = {
    getBook
};

function getBook(id) {
    const requestOptions = {
        method: 'GET',
        url: '/library/book/' + id + '/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    return axios(requestOptions)
        .then(book => {
            return book;
        }); 
}