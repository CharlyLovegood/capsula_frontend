export const searchService = {
    request
};

function request(searchRequest) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({searchRequest})
    };

    return fetch('http://localhost:8000/auth/login/', requestOptions)
        .then(handleResponse)
        .then(searchResult => {
            return searchResult;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}