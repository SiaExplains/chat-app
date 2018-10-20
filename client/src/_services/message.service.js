import { authHeader, config } from '../_helpers'

export const messageService = {
    save,
    getSent,
    getById
};

function save(message) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 
            'Content-Type': 'application/json',    
            'Access-Control-Allow-Origin':'*',

    },
        body: JSON.stringify(message)               
    };
    return fetch(config.apiUrl + '/message/save', requestOptions).then(handleResponse, handleError);
}

function getSent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/message/sents', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var x = fetch(config.apiUrl + '/message/' + id, requestOptions).then(handleResponse, handleError);    
    return x;
}

function handleResponse(response) {

    
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}