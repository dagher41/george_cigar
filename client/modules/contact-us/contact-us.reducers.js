import { CU_EMAIL_CHANGED, CU_MESSAGE_CHANGED, CU_POST_MESSAGE, CU_POST_MESSAGE_COMPLETE } from './contact-us.actions'
const initialState = {
    email: '',
    message: '',
    messagePosting: false,
    messagePosted: false
}

export default function contactForm(previousState = initialState, action) {
    switch (action.type) {
        case CU_EMAIL_CHANGED:
            return Object.assign({}, previousState, {
                email: action.email
            });
        case CU_MESSAGE_CHANGED:
            return Object.assign({}, previousState, {
                message: action.message
            });
        case CU_POST_MESSAGE:
            return Object.assign({}, previousState, {
                messagePosting: true
            });
        case CU_POST_MESSAGE_COMPLETE:
            return Object.assign({}, previousState, {
                messagePosting: false,
                messagePosted: true
            });
        default:
            return previousState
    }
}