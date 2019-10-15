import * as axios from "axios";

export const userService = {
    login,
    logout,
    register,
    getById
};


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username, password })
    };

    return fetch('http://localhost:8000/auth/login/', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('username', user.django_user.username);
            localStorage.setItem('lastName', user.last_name);
            localStorage.setItem('firstName', user.first_name);
            localStorage.setItem('token', user.token);
            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        url: '/auth/logout/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    }

    return axios(requestOptions)
        .then(user => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
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

    return fetch('http://localhost:8000/auth/registration/', requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        url: '/user/' + id + '/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    };

    return axios(requestOptions)
        .then(user => {
            return user;
        }); 
}



export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}