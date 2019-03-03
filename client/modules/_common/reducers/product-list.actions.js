import { callApi } from '../util/apiCaller';
export const PL_PRODUCTS_REQUESTED = 'PL_PRODUCTS_REQUESTED';
export const PL_PRODUCTS_COMPLETE = 'PL_PRODUCTS_COMPLETE';

export function requestProducts(tag) {
    return dispatch => {
        dispatch(productRequestComplete([]));
        dispatch(initiateRequest());
        return callApi({ method: 'get', endpoint: `${tag}/products` })
            .then(response => {
                return dispatch(productRequestComplete(response.data))
            });
    }
}

function initiateRequest() {
    return {
        type: PL_PRODUCTS_REQUESTED
    }
}

function productRequestComplete(response) {
    return {
        type: PL_PRODUCTS_COMPLETE,
        response
    }
}