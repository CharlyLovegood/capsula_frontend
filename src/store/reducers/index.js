import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { search } from './search.reducer';
import { userpage } from './userpage.reducer';
import { library } from './library.reducer';
import { book } from './book.reducer';


const rootReducer = combineReducers({
    authentication: authentication,
    registration,
    alert,
    search,
    userpage,
    library,
    book
});

export default rootReducer;