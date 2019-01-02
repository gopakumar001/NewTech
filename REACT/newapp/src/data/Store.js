import { createStore, combineReducers } from 'redux'
import counterReducer from './Reducers/Counter';

const rootReducer = combineReducers({
    counterReducer
});
export default createStore(rootReducer);

 