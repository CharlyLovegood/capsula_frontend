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
        .then(bookList => {
            return bookList;
        }); 
}