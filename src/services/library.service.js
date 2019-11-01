import * as axios from "axios";
import { back_url } from './../helpers';

export const libraryService = {
    getBookListById
};

function getBookListById(userId) {
    const requestOptions = {
        method: 'GET',
        url: back_url.library.get_library_by_id(userId),
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(handleResponse)
        .then(bookList => {
            return bookList;
        }); 
}

export function handleResponse(response) {
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response;
}