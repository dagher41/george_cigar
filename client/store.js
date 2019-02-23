import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import appReducers from './reducers'

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


export default function configureStore(intialState = {}) {
    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
    );
    const store = createStore(appReducers, intialState, enhancer)

    return store;
}