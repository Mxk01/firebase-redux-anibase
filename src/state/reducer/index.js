import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';






// combining the reducers
export let combinedReducers = combineReducers({
    item: itemsReducer
})