/**
 * Created by mapbar_front on 2017/9/6.
 */
import { combineReducers } from 'redux';

import * as taskReducers from './taskReducers';

import * as inputReducers from './inputReducers';

const rootReducer = combineReducers({
    ...taskReducers,
    ...inputReducers
});
export default rootReducer;
