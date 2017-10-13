/**
 * Created by mapbar_front on 2017/10/13.
 */
import { TYPES } from '../actions/index';

export function inputStore(state='',action){
    switch (action.type){
        case TYPES.CONTENT_INPUT:
            return action.contentInput;
        default:
            return state
    }
}