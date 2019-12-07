import { PL_PRODUCTS_REQUESTED, PL_PRODUCTS_COMPLETE } from './product-list.actions'
const initialState = {
    requestPending: false,
    products: []
}

export default function productList(previousState = initialState, action) {
    switch (action.type) {
        case PL_PRODUCTS_REQUESTED:
            return Object.assign({}, previousState, {
                requestPending: true
            });
        case PL_PRODUCTS_COMPLETE:
            return Object.assign({}, previousState, {
                requestPending: false,
                sections: action.response.sections
            });
        default:
            return previousState
    }
}