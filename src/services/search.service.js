import * as axios from "axios";
import { back_url } from './../helpers';


export const searchService = {
    request
};

function request() {
    const requestOptions = {
        method: 'GET',
        url: back_url.library.get_all_books,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    return axios(requestOptions)
        .then(bookList => {
            return bookList;
        }); 
}