import { callGoogleApi } from '../_common/util/apiCaller'
export const CU_EMAIL_CHANGED = 'CU_EMAIL_CHANGED';
export const CU_MESSAGE_CHANGED = 'CU_MESSAGE_CHANGED';
export const CU_POST_MESSAGE = 'CU_POST_MESSAGE';
export const CU_POST_MESSAGE_COMPLETE = 'CU_POST_MESSAGE_COMPLETE';

export function emailChanged(email) {
    return {
        type: CU_EMAIL_CHANGED,
        email
    }
}

export function messageChanged(message) {
    return {
        type: CU_MESSAGE_CHANGED,
        message
    }
}

export function postMessage(message) {
    return dispatch => {
        return callGoogleApi({ body: message })
            .then(response => {
                return dispatch(postMessageComplete(response))
            })
    }
}

function postMessageComplete(response) {
    return {
        type: CU_POST_MESSAGE_COMPLETE,
        response
    }
}