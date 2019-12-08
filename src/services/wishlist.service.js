import * as axios from 'axios';
import { back_url } from './../helpers';

export const wishlistService = {
    deleteFromWishlist,
    addToWishlist,
    getWishlist
};

function deleteFromWishlist(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return fetch(back_url.wishlist.delete_from_wishlist(id), requestOptions)
        .then(handleResponse)
        .then(
            response => {
                return response.json();
            });
}


function addToWishlist(id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify({'id': id})
    };

    return fetch(back_url.wishlist.add_to_wishlist, requestOptions)
        .then(handlePostResponse)
        .then(
            response => {
                return response.json();
            })
}

function getWishlist() {
    const requestOptions = {
        method: 'GET',
        url: back_url.wishlist.get_wishlist,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(handleResponse)
        .then(wishlistList => {
            return wishlistList.data;
        }); 
}



function handlePostResponse(response) {
    if (response.status !== 200) {
        return response.text().then(text => {
            const data = JSON.parse(text);
            const error = data.detail || data.msg;
            return Promise.reject(error);
        });
    }
    return response;
}


function handleResponse(response) {
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response;
}
