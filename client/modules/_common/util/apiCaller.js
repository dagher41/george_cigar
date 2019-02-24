import axios from 'axios';

export function callApi({ endpoint, method = 'get', body }) {
    return axios({
        headers: { 'content-type': 'application/json' },
        method: method,
        url: `/api/${endpoint}`,
        data: body
    })
        .then((response) => {
            return response;
        })
        .catch(
            error => error
        );
}