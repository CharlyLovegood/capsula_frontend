import * as axios from "axios";


export const searchService = {
    request
};

function request() {
    const requestOptions = {
        method: 'GET',
        url: '/library/books/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    return axios(requestOptions)
        .then(bookList => {
            return bookList;
        }); 
}