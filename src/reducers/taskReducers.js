/**
 * Created by mapbar_front on 2017/9/6.
 */
import { TYPES } from '../actions/index';

const TASK_STATE = {
    taskTitle:'',
    taskContent:'',
    taskId:null,
    taskSubjectId:''
};
export function taskStore(state = TASK_STATE,action) {
    switch (action.type){
        case TYPES.ADDTSAK_CONTENT:
            return Object.assign(TASK_STATE,{
                taskContent:action.taskContent
            });
            break;
        case TYPES.ADDTSAK_TITLE:
            return Object.assign(TASK_STATE,{
                taskTitle:action.taskTitle
            });
            break;
        case TYPES.ADDTASK_ID:
            return Object.assign(TASK_STATE,{
                taskId:action.taskId
            });
        case TYPES.ADDTASK_SUBJECTID:
            return Object.assign(TASK_STATE,{
                taskSubjectId: action.taskSubjectId
            });
        default:
            return state
    }
}
