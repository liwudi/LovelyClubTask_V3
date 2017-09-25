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

export function getTaskSubjectList() {

    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/getTaskSubjectList'),
            data:{
                page:1,
                rows:10
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


export function saveTaskFinished(content,taskSubjectId,userId) {
    return new Promise((resolve,reject) => {
        ajax({
            url:makeUrl('/task/saveTaskFinished'),
            data:{
                content,
                taskSubjectId,
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

