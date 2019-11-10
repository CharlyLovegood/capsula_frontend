import * as axios from "axios";
import { back_url } from './../helpers';


export const searchService = {
    request,
    requestPage
};

function request() {
    const requestOptions = {
        method: 'GET',
        url: back_url.library.get_all_books,
    };
    return axios(requestOptions)
        .then(handleResponse)
        .then(bookList => {
            console.log(bookList)
            return bookList;
        }); 
}

function requestPage(page) {
    const requestOptions = {
        method: 'GET',
        url: back_url.library.get_all_books_page(page),
    };
    return axios(requestOptions)
        .then(handleResponse)
        .then(bookList => {
            return bookList;
        }); 
}


function handleResponse(response) {
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response;
}