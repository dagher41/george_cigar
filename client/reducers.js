import { combineReducers } from 'redux';
import contactForm from './modules/contact-us/contact-us.reducers';
import productList from './modules/_common/reducers/product-list.reducer';
import reviewsList from './modules/home/reducers/home.reducer';

export default combineReducers({
    contactForm,
    productList,
    reviewsList
});