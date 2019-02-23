import axios from 'axios';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
    process.env.BASE_URL || '/api' :
    '/api';

// export function callApi(endpoint, method = 'get', body) {
//     return fetch(`${API_URL}/${endpoint}`, {
//         headers: { 'content-type': 'application/json' },
//         method,
//         body: JSON.stringify(body),
//     })
//         .then(response => response.json().then(json => ({ json, response })))
//         .then(({ json, response }) => {
//             if (!response.ok) {
//                 return Promise.reject(json);
//             }

//             return json;
//         })
//         .then(
//             response => response,
//             error => error
//         );
// }

export function callGoogleApi({ body, method = 'get' }) {
    console.log('fetch:, ', fetch, ' body: ', body, ' method: ', method);
    return axios.get(`https://script.google.com/macros/s/AKfycbwiK-ZKQNWvI0TCJCyirSOrC6u0jpS6B1Ltzwfz6IexikJnO_oz/exec`, {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    })
        .then((response) => {
            console.log('response: ', response);
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
        .then(
            response => response,
            error => error
        );
}