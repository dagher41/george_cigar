import { callApi } from '../../_common/util/apiCaller';
export const HOME_REVIEWS_REQUESTED = 'HOME_REVIEWS_REQUESTED';
export const HOME_REVIEWS_COMPLETE = 'HOME_REVIEWS_COMPLETE';

export function requestReviews() {
    return dispatch => {
        dispatch(reviewsRequestComplete([]));
        dispatch(initiateRequest());
        return callApi({ method: 'get', endpoint: `/reviews` })
            .then(response => {
                return dispatch(reviewsRequestComplete(response.data))
            });
    }
}

function initiateRequest() {
    return {
        type: HOME_REVIEWS_REQUESTED
    }
}

function reviewsRequestComplete(response) {
    return {
        type: HOME_REVIEWS_COMPLETE,
        response
    }
}