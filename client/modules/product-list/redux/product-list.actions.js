import { callApi } from '../../_common/util/apiCaller';
export const PL_PRODUCTS_REQUESTED = 'PL_PRODUCTS_REQUESTED';
export const PL_PRODUCTS_COMPLETE = 'PL_PRODUCTS_COMPLETE';

export function requestProducts(page) {
    return dispatch => {
        dispatch(productRequestComplete([]));
        dispatch(initiateRequest());
        return callApi({ method: 'GET', endpoint: `pages/${page}` })
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