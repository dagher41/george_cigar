import { combineReducers } from 'redux';
import contactForm from './modules/contact-us/redux/contact-us.reducer';
import productList from './modules/product-list/redux/product-list.reducer';
import reviewsList from './modules/generic-hero-page/redux/generic-hero-page.reducer';
import catalogData from './modules/app/redux/app.reducer';

export default combineReducers({
    contactForm,
    productList,
    reviewsList,
    catalogData
});