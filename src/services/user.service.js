import * as axios from "axios";
import { back_url } from './../helpers';

export const userService = {
    login,
    logout,
    register,
    getById,
    editUser,
    oauth
};


function oauth() {
    const requestOptions = {
        method: 'GET',
        url: '/auth/login/'
    };

    return axios(requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('username', user.django_user.username);
            localStorage.setItem('lastName', user.last_name);
            localStorage.setItem('firstName', user.first_name);
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);
            localStorage.setItem('avatar', user.avatar);
            localStorage.setItem('location', user.location);
            return user;
        })
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {'Content-Type': 'application/json'}
    };

    return fetch(back_url.authentication.login, requestOptions)
        .then(handleResponse)
        .then(user => {
            // console.log(user.json())
            localStorage.setItem('username', user.django_user.username);
            localStorage.setItem('lastName', user.last_name);
            localStorage.setItem('firstName', user.first_name);
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);
            localStorage.setItem('avatar', user.avatar);
            localStorage.setItem('location', user.location);
            return user;
        });
}


function logout() {
    const requestOptions = {
        method: 'GET',
        url: back_url.authentication.logout,
        headers: {'Authorization': 'Token ' + localStorage.token}
    }

    return axios(requestOptions)
        .then(user => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('firstName');
            localStorage.removeItem('avatar');
            localStorage.removeItem('lastName');
            localStorage.removeItem('location', user.location);
            localStorage.removeItem('id');
            return user;
        }); 
}


function register(user) {
    user = {
        'username': user.username,
        'password': user.password,
        'email': user.email,
        'first_name': user.firstname,
        'last_name': user.lastname
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user)
    };

    return fetch(back_url.authentication.registration, requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        url: back_url.user.get_user_by_id(id),
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(user => {
            return user;
        }); 
}


function editUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('/user/me/', requestOptions)
        .then(handleResponseData)
        .then(
            response => {
                console.log(user)
                if (user.image !== undefined) localStorage.setItem('avatar', user.image);
                localStorage.setItem('lastName', user.last_name);
                localStorage.setItem('firstName', user.first_name);
                localStorage.setItem('location', user.location);
                return user;
            });
}



export function handleResponse(response) {
    return response.text().then(text => {
        console.log(response)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export function handleResponseData(response) {
    const data = response.data;
    if (response.status !== 200) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    return data;
}