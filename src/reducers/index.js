/**
 * Created by mapbar_front on 2017/9/6.
 */
import { combineReducers } from 'redux';

import * as taskReducers from './taskReducers';

const rootReducer = combineReducers({
    ...taskReducers,
});
export default rootReducer;
