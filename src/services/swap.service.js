import * as axios from "axios";
import { back_url } from './../helpers';

export const swapService = {
    getSwap,
    changeSwapStatus,
    swapRequest
};

function getSwap() {
    const requestOptions = {
        method: 'GET',
        url: back_url.swap.get_swap_list,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(handleResponse)
        .then(swapList => {
            return swapList;
        }); 
}


function changeSwapStatus(id, status) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify({status: status})
    };
    
    return fetch(back_url.swap.change_status(id), requestOptions)
        .then(handleResponse)
        .then(
            response => {
                return response;
            });
}

function swapRequest(id) {
    const book = {
        "book_id": id
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    }

    return fetch('/library/swaps/', requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}


function handleResponse(response) {
    console.log(response)
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response;
}