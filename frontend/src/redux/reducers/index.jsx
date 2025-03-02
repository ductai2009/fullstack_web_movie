import { combineReducers } from 'redux';
import { allUserReducer, authReducer, userReducer } from './authReducer';
import { commentReducer } from './commentReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    allUser: allUserReducer,
    user: userReducer,
    comment: commentReducer,
    search: searchReducer,
});
export default rootReducer;
