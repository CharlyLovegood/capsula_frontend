import * as axios from "axios";

export const libraryService = {
    getBookListById
};


function getBookListById(userId) {
    const requestOptions = {
        method: 'GET',
        url: '/library/book_items/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(bookList => {
            return bookList;
        }); 
}