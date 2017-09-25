/**
 * Created by mapbar_front on 2017/9/6.
 */
import { ADDTSAK_CONTENT,ADDTSAK_TITLE,ADDTASK_ID } from './types';

export function taskContent(taskContent) {
    return {
        type:ADDTSAK_CONTENT,
        taskContent
    }
}

export function taskTitle(taskTitle){
    return {
        type:ADDTSAK_TITLE,
        taskTitle
    }
}

export function taskId(taskId) {
    return {
        type:ADDTASK_ID,
        taskId
    }
}