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
            localStorage.setItem('user', user.first_name);
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    // const requestOptions = {
    //     method: 'GET',
    //     url: '/auth/logout/',
    //     headers: {'Authorization': 'Token ' + localStorage.user}
    // }

    
    // return fetch('http://localhost:8000/auth/logout/', requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         localStorage.removeItem('user');
    //         return user;
    //     });   
}


function register(user) {
    user = {
        'username': 'Katushka',
        'password': 'Capsula1337',
        'email': 'ivanova.ev@milandr.ru',
        'first_name': 'Ekaterina',
        'last_name': 'Ivanova'
    };

    console.log(user);
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
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}