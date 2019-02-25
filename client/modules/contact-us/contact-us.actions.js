import { callApi } from '../_common/util/apiCaller'
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
        dispatch(initiateRequest());
        return callApi({ body: message, method: 'post', endpoint: 'messages' })
            .then(response => {
                dispatch(emailChanged(''));
                dispatch(messageChanged(''));
                return dispatch(postMessageComplete(response))
            })
    }
}

function initiateRequest() {
    return {
        type: CU_POST_MESSAGE
    }
}

function postMessageComplete(response) {
    return {
        type: CU_POST_MESSAGE_COMPLETE,
        response
    }
}