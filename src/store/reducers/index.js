import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { search } from './search.reducer';
import { userpage } from './userpage.reducer';


const rootReducer = combineReducers({
    authentication: authentication,
    registration,
    alert,
    search,
    userpage
});

export default rootReducer;