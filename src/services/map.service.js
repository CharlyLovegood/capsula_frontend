import * as axios from 'axios';
import { back_url } from './../helpers';



export const mapService = {
    getMarkersList,
    deleteMarker,
    addMarker
};


function getMarkersList() {
    const requestOptions = {
        method: 'GET',
        url: back_url.map.get_list,
        headers: {'Authorization': 'Token ' + localStorage.token}
    };
    
    return axios(requestOptions)
        .then(response => handleResponse(response))
        .then(map => {
            return map.data;
        }); 
}


function deleteMarker(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return fetch(back_url.map.delete_marker(id), requestOptions)
        .then(handleResponse)
        .then(
            response => {
                return response;
            });
}


function addMarker(marker) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(marker)
    };

    return fetch(back_url.map.add_marker, requestOptions)
        .then(handlePostResponse)
        .then(
            response => {
                return response.json();
            })
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
