import * as axios from "axios";

export const swapService = {
    getSwap
};

function getSwap() {
    const requestOptions = {
        method: 'GET',
        url: '/library/swaps/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(swapList => {
            return swapList;
        }); 
}