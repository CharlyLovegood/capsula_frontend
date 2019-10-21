import { back_url } from './../helpers';

export const settingsService = {
    changeUserData
};

function changeUserData(user) {    
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': 'Token ' + localStorage.token,
                'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(back_url.user.change_user_data, requestOptions)
        .then(
            response => {
                return response;
            },
            error => {
                console.log(error);
            });
}