import * as axios from "axios";

export const swapService = {
    getSwapProposals,
    getSwapRequests,
    getInProcessSwaps,
    getOnHandsSwaps,
    getHistorySwaps
};



function getSwapProposals() {
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


function getSwapRequests() {
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


function getInProcessSwaps() {
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


function getOnHandsSwaps() {
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


function getHistorySwaps() {
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

