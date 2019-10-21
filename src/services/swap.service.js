import * as axios from "axios";
import { back_url } from './../helpers';

export const swapService = {
    getSwap,
    changeSwapStatus
};

function getSwap() {
    const requestOptions = {
        method: 'GET',
        url: back_url.swap.get_swap_list,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
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
        .then(
            response => {
                return response;
            },
            error => {
                console.log(error);
            });
}