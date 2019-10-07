export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ username, password })
    };

    return fetch('http://localhost:8000/auth/login/', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('username', user.username);
            localStorage.setItem('secondName', user.second_name);
            localStorage.setItem('firstName', user.first_name);
            localStorage.setItem('token', user.token);
            return user;
        });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('secondName');

    const requestOptions = {
        method: 'GET',
        url: '/auth/logout/',
        headers: {'Authorization': 'Token ' + localStorage.token}
    }

    
    return fetch('http://localhost:8000/auth/logout/', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('firstName');
            localStorage.removeItem('secondName');
            return user;
        });   
}


function register(user) {
    console.log(user);
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


function handleResponse(response) {
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