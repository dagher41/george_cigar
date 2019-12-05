import { HOME_REVIEWS_COMPLETE, HOME_REVIEWS_REQUESTED } from './home.actions'
const initialState = {
    requestPending: false,
    reviews: []
}

export default function productList(previousState = initialState, action) {
    switch (action.type) {
        case HOME_REVIEWS_REQUESTED:
            return Object.assign({}, previousState, {
                requestPending: true
            });
        case HOME_REVIEWS_COMPLETE:
            return Object.assign({}, previousState, {
                requestPending: false,
                reviews: action.response
            });
        default:
            return previousState
    }
}