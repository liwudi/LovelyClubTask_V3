/**
 * Created by mapbar_front on 2017/9/6.
 */
import RequestService from './BaseServices';

import serverConfig from '../config';
const serviceUrl = serverConfig.server.main_url;

import { ajax } from './BaseServices';


function makeUrl(url) {
    if(url){
        return serviceUrl + url
    }
    return serviceUrl;

}

export function getTaskSubjectList(page,rows) {

    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/getTaskSubjectList'),
            data:{
                page:page || 1,
                rows:rows || 10
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function findTaskSubjectById(subjectId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/findTaskSubjectById'),
            data:{
                subjectId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })

}



export function updateTaskSubject(subject,content,id,userId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/updateTaskSubject'),
            data:{
                subject,
                content,
                id,
                userId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    });
    // return RequestService.post(
    //     makeUrl('/deleteTaskSubject'),
    //     {
    //         subjectId: subjectId
    //     }
    // );
    // return Promise.resolve({
    //     "errorCode": "success",
    //     "errorMsg": null,
    //     "result": null
    // })
}
export function deleteTaskSubject(subjectId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/deleteTaskSubject'),
            data:{
                subjectId: subjectId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    });
    // return RequestService.post(
    //     makeUrl('/deleteTaskSubject'),
    //     {
    //         subjectId: subjectId
    //     }
    // );
    // return Promise.resolve({
    //     "errorCode": "success",
    //     "errorMsg": null,
    //     "result": null
    // })
}

export function saveTaskSubject(subject,content,userid) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/saveTaskSubject'),
            data:{
                subject,
                content,
                userid
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    });
}

export function getTaskFinishedList(taskSubjectId,page,rows) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/getTaskFinishedList'),
            data:{
                taskSubjectId: taskSubjectId,
                page: page || 1,
                rows: rows || 10
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }
        })
    });
}

export function findTaskFinishedById(id) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/findTaskFinishedById'),
            data:{
                id
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })

}


export function saveTaskFinished(content,taskSubjectId,userId,id) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/saveTaskFinished'),
            data:{
                content,
                taskSubjectId,
                userId,
                id
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function updateTaskFinished(content,id) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/updateTaskFinished'),
            data:{
                content,
                id
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function deleteTaskFinished(finishedId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/deleteTaskFinished'),
            data:{
                finishedId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function saveFinishedComment(content,taskFinishedId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/saveFinishedComment?'),
            data:{
                content,
                taskFinishedId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function deleteFinishedComment(id) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/deleteFinishedComment'),
            data:{
                id
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function saveFinishedPraise(taskFinishedId,userId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/saveFinishedPraise'),
            data:{
                taskFinishedId,
                userId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}


export function deleteFinishedPraise(id) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/deleteFinishedPraise'),
            data:{
                id
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

//作业题目-下载声音
export function taskSubject_dloadVoice(serverId,taskSubjectId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/dloadVoice'),
            data:{
                serverId,
                taskSubjectId
            },
            method:'GET',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }
        })
    })
}
//作业题目-下载图片
export function taskSubject_dloadImg(serverId,taskSubjectId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/dloadImg'),
            data:{
                serverId,
                taskSubjectId
            },
            method:'GET',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }
        })
    })
}
//作业结果-下载声音
export function dloadVoice(serverId,taskFinishedId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/dloadVoice'),
            data:{
                serverId,
                taskFinishedId
            },
            method:'GET',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}
//作业结果-下载图片
export function dloadImg(serverId,taskFinishedId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/dloadImg'),
            data:{
                serverId,
                taskFinishedId
            },
            method:'GET',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function getVoiceByServerId(serverId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/getVoiceByServerId'),
            data:{
                serverId
            },
            method:'GET',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}

export function getImgByServerId(serverId) {
    return new Promise((resolve,reject) => {

        alert('serverId参数'+serverId);
        ajax({
            url:makeUrl('/task/getImgByServerId'),
            data:{
                serverId
            },
            method:'GET',
            success:function (res) {
                alert('成功获取图片',res);
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }

        })
    })
}



export function getUserInfo(openId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/getUserInfo'),
            data:{
                openId
            },
            method:'POST',
            success:function (res) {
                resolve(res);
            },
            fail:function (err) {
                reject(err);
            }
        });
    })
}
