import { createStore } from 'redux';
import rootReducer from '../reducers/index';

store = createStore(rootReducer);

export default store;