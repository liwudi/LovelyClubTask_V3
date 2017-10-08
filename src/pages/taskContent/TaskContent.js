/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskContent.css';
import TopBanner from '../../components/TopBanner';
import Button from '../../components/Button';
import NewTask from '../../components/NewTask';
import Modal1 from '../../components/Modal1';
import Modal from '../../components/Modal';
import {
    TYPES,
    TaskActions
} from '../../actions/index';
import { findTaskSubjectById,saveTaskFinished,dloadVoice,dloadImg,task_dloadImg,task_dloadVoice,getVoiceByServerId,getImgByServerId,taskSubject_dloadVoice,taskSubject_dloadImg } from '../../services/AppServices';


import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;

class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            taskSubjectId: JSON.parse(props.match.params.taskSubjectId).taskSubjectId,//这个记录的是学生交作业的课程id
            willAddVoiceList:[],
            addImageList:[],
            id: -(Math.floor(Math.random()*100000)+10000)
        }
    }
    componentDidMount(){
        this.initTeacherEditData();
        this.initStudentsEditData();
    }
    initTeacherEditData(){
        let str = this.props.match.params.taskSubjectId;
        let type = JSON.parse(str).type;
        if(type == 3){
            let taskSubjectId = JSON.parse(str).taskId;
            this.setState({
                id:taskSubjectId
            });
            findTaskSubjectById(taskSubjectId).then(res => {
                res = JSON.parse(res);
                console.log('findTaskSubjectById',res);
                this.setState({
                    // taskTitle:res.subject,
                    // taskContent:res.content,
                    // taskPicsList: res.taskPicsList,
                    // taskVoiceList: res.taskVoiceList,
                    willAddVoiceList:res.taskVoiceList,
                    addImageList:res.taskPicsList,
                })
            });
        }else{
            return
        }
    }
    initStudentsEditData(){
        let str = this.props.match.params.taskSubjectId;
        let type = JSON.parse(str).type;
        if(type == 4){
            let taskFinishedId = JSON.parse(str).taskFinishedId;
            this.setState({
                id:taskFinishedId
            });
        }
    }




    /**
     * @这个goback的难点在作业的入口有几个？
     * 1、学生交作业是一个入口
     * 2、老师布置作业，编辑作业内容的时候算一个入口。
     * 3、学生编辑已经提交的作业。
     * 4、老师编辑已经布置的作业。
     *
     */
    goBack(){
        let str = this.props.match.params.taskSubjectId;
        str = JSON.parse(str);

        if(str.type == 3){
            //alert('老师编辑作业')
            //在提交作业的情况下
            this.teacherEditTask();
        }else if(str.type == 1){
            //在布置作业的情况下
            //alert('老师布置作业的情况')
            this.teacherSetTask();
        }else if(str.type == 2){
            //alert('学生提交作业的情况')
            //在提交作业的情况下
            this.fetchData();
        }else if(str.type == 4){
            //alert("学生编辑作业")
        }

    }
    //学生交作业
    fetchData(){
        let content = this.state.inputValue;
        let taskSubjectId = Number(this.state.taskSubjectId) || 1;
        //alert(localStorage.getItem('userInfo'));
        let userId = JSON.parse(localStorage.getItem('userInfo')).openId;
        //alert(userId);
        saveTaskFinished(content,taskSubjectId,userId,this.state.id).then(res => {
            console.log('saveTaskFinished',res);
            //alert('成功的保存了作业，上传的id是'+this.state.id);
            this.props.history.goBack();
        }).catch(err => {
            this.setState({
                isShowFailInfo: true
            },()=>{
                setTimeout(()=>{
                    isShowFailInfo: false
                },2000)
            })
        })
    }
    //老师编辑作业
    teacherEditTask(){
        let str = this.props.match.params.taskSubjectId;
        str = JSON.parse(str);
        let taskSubjectId = str.taskId;//上个页面传递的taskSubjectId，但是taskSubjectId被交作业的taskSubjectId占用。
        this.props.dispatch(TaskActions.taskContent(this.state.inputValue));
        this.props.dispatch(TaskActions.taskId(taskSubjectId));
        this.props.history.goBack();
    }
    //老师布置作业
    teacherSetTask(){
        this.props.dispatch(TaskActions.taskContent(this.state.inputValue));
        this.props.dispatch(TaskActions.taskId(this.state.id));
        //alert('进行dispatch>>'+this.state.id);
        this.props.history.goBack();
    }





    //录音
    addVoice(){
        let _this = this;
        //this.isComplated = false;
        this.setState({
            isComplated: false
        })
        if(this.state.isRecording){
            //alert("执行录音结束end事件");
            this.addVoiceEndEvent();
        }else{
            //alert('开始执行录音start');
            _this.setState({
                isRecording: true
            })
            this.addVoiceStartEvent();
        }
    }

    addVoiceStartEvent(){
        let _this = this;
        wx.startRecord({
            success: function (res) {
                //_this.isRecording = true;

                //alert('录音成功start'+res);

            },
            cancel: function () {
                //alert('用户拒绝授权录音');
                _this.setState({
                    isShowVoiceInfo: true
                })
            }
        });
        wx.onVoiceRecordEnd({
            complete: function (res) {
                //voice.localId = res.localId;
                let localId = res.localId;
                //alert('录音时间已超过一分钟>>'+res.localId);
                _this.setState({
                    isShowVoiceComplateInfo: true,
                    isRecording: false,
                    isComplated: true
                });
                //Todo:上传语音id得到serverId
                //_this.upLoadVoice(localId,taskFinishedId);
            }
        });
    }

    addVoiceEndEvent(){
        let _this = this;
        let taskFinishedId = '1';
        wx.stopRecord({
            success: function (res) {
                _this.localId = res.localId;
                _this.setState({
                    isRecording: false,
                    isComplated: true
                });


                //alert("录音结束EndEvent>>"+_this.localId);
                //Todo:上传语音id得到serverId
                //_this.upLoadVoice(localId,taskFinishedId);
            },
            fail: function (err) {
                //alert("录音结束EndEvent>>"+err);
                //alert(JSON.stringify(res));
            }
        });
    }

    upLoadVoice(){
        let _this = this;
        let type = JSON.parse(_this.props.match.params.taskSubjectId).type;
        wx.uploadVoice({
            localId:_this.localId+"",
            success: function (res) {
                let serverId = res.serverId;
                //alert('上传语音成功，下面自动调用下载语音>>serverID'+serverId);
                let id = _this.state.id;
                if(type == 2){//在交作业的情况下
                    finishTask();
                }else if(type == 1){//在布置作业情况下
                    task_finishTask();
                }

                function finishTask() {
                    dloadVoice(serverId,_this.state.id).then(res => {
                        //alert('服务端已经下载好语音了')
                        getVoiceByServerId(serverId).then(res => {
                            res = JSON.parse(res);
                            let url = serviceUrl + res.fullPath;
                            _this.setState({
                                willAddVoiceList:_this.state.willAddVoiceList.concat([url])
                            })
                        })
                    }).catch(err=>{
                        //alert('发生错误>>'+err);
                    })
                }
                function task_finishTask() {
                    task_dloadVoice(serverId,_this.state.id).then(res => {
                        //alert('服务端已经下载好语音了')
                        getVoiceByServerId(serverId).then(res => {
                            res = JSON.parse(res);
                            let url = serviceUrl + res.fullPath;
                            _this.setState({
                                willAddVoiceList:_this.state.willAddVoiceList.concat([url])
                            })
                        })
                    }).catch(err=>{
                        //alert('发生错误>>'+err);
                    })
                }

            },
            fail: function (err) {
                //alert('上传语音失败'+err);
            }
        })
    }
    taskVoice(serverId,id){
        let _this = this;
        dloadVoice(serverId,id).then(res => {
            getVoiceByServerId(serverId).then(res => {
                //声音下载到本地
                res = JSON.parse(res);
                let url = serviceUrl + res.fullPath;
                _this.setState({
                    willAddVoiceList:_this.state.willAddVoiceList.concat([url])
                })
            })
        }).catch(err=>{
            alert('发生错误>>'+err);
        })
    }
    taskImg(serverId,id){
        let _this = this;
        dloadImg(serverId,_this.state.id).then(res => {
            getImgByServerId(serverId).then(res => {
                //图片下载到本地
                res = JSON.parse(res);
                let url = serviceUrl + res.fullPath;
                _this.setState({
                    addImageList:_this.state.addImageList.concat([url])
                });
            }).catch(err => {
                alert('没有下载到本>>>>'+err);
            })
        });
    }

    addPicEvent(){
        this.chooseImage();
    }
    chooseImage(){
        let _this = this;
        let type = JSON.parse(_this.props.match.params.taskSubjectId).type;
        wx.chooseImage({
            success: function (res) {
                //alert('选择图片成功')
                let localIds = res.localIds;

                let i = 0, length = localIds.length;
                //upload();
                function upload() {
                    //alert('开始上传图片'+i);
                    //alert('这是的localId是》》'+localIds[i]);
                    wx.upLoadImage({
                        localId: localIds[i],
                        isShowProgressTips: 1,
                        success: function (res) {
                            //alert('上传图片成功，serverid>>'+res.serverId);
                            i++;
                            if (i < length) {
                                upload();
                            }
                            let serverId = res.serverId;
                            //交作业
                            if(type == 2){
                                finishedTask_img()
                            }else if(type == 1){
                                //布置作业
                                task_img();
                            }
                            function finishedTask_img() {
                                dloadImg(serverId,_this.state.id).then(res => {
                                    getImgByServerId(serverId).then(res => {
                                        //alert('获取图片成功')
                                        res = JSON.parse(res);
                                        let url = serviceUrl + res.fullPath;
                                        _this.setState({
                                            addImageList:_this.state.addImageList.concat([url])
                                        });
                                    }).catch(err => {
                                        alert('没有下载到本>>>>'+err);
                                    })
                                });
                            }
                            function task_img(){
                                taskSubject_dloadImg(serverId,_this.state.id).then(res => {
                                    getImgByServerId(serverId).then(res => {
                                        //alert('获取图片成功')
                                        res = JSON.parse(res);
                                        let url = serviceUrl + res.fullPath;
                                        _this.setState({
                                            addImageList:_this.state.addImageList.concat([url])
                                        });
                                    }).catch(err => {
                                        alert('没有下载到本>>>>'+err);
                                    })
                                });
                            }

                        },
                        fail: function (res) {
                            alert('上传图片失败'+res);
                        }
                    })
                }
                let localId = localIds.toString();
                _this.upLoadImage(localId);
            },
            fail: function (err) {
                alert('上传图片接口调用失败');
            }
        })
    }

    upLoadImage(localId){
        let _this = this;
        //alert(_this.props.match.params.taskSubjectId)
        let type = JSON.parse(_this.props.match.params.taskSubjectId).type;

        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                //将上传的图片下载到本地服务器
                //alert("type="+type);
                if(type == 2){
                    //在提交作业的情况下
                    finishTask();
                }else if(type == 1){
                    //在布置作业情况下
                    //alert('upload sucess')
                    task_finishTask();
                }
                function finishTask() {
                    dloadImg(serverId,_this.state.id).then(res => {
                        getImgByServerId(serverId).then(res => {
                            //图片下载到本地
                            res = JSON.parse(res);
                            //alert('下载到本地的图片路径>>>>>'+res.fullPath);
                            let url = serviceUrl + res.fullPath;

                            //alert(_this.state.addImageList.concat([url]));
                            _this.setState({
                                addImageList:_this.state.addImageList.concat([url])
                            });
                        }).catch(err => {
                            alert('没有下载到本>>>>'+err);
                        })
                    });
                }
                function task_finishTask() {
                    //alert("执行task_finishTask");
                    task_dloadImg(serverId,_this.state.id).then(res => {
                        //alert('服务端已经下载好图片了')
                        getImgByServerId(serverId).then(res => {
                            res = JSON.parse(res);
                            let url = serviceUrl + res.fullPath;
                            _this.setState({
                                addImageList:_this.state.addImageList.concat([url])
                            })
                        })
                    }).catch(err=>{
                        alert('发生错误>>'+err);
                    })
                }
            }
        });
    }
    renderContent(){
        return (
            <div>
                <textarea onChange={(e)=>{this.setState({inputValue:e.target.value})}} placeholder="请输入作业内容" className="textArea"></textarea>
            </div>
        )
    }
    render(){
        return(
            <div className="pageBox">
                <TopBanner title="作业内容" router={this.props.history} />
                <div className="fx1" style={{overflow: 'auto'}}>
                <div className="marginTop">
                    {
                        this.renderContent()
                    }
                </div>
                <div className="marginTop">
                    {
                        this.state.willAddVoiceList.map((item,index) => {
                            return (
                                <audio key={index} className="voiceBox marginTop" controls>
                                    <source src={this.state.willAddVoiceList[index]} type="audio/mpeg" />
                                </audio>
                            )
                        })
                    }
                </div>
                <div className="marginTop upLoadImageContainer bgWhite">
                    {
                        this.state.addImageList.map((item,index) => {
                            return (
                                <div className="upLoadImageBox" key={index}>
                                    <img className="upLoadImage" src={this.state.addImageList[index]} alt="上传图片" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="otherInfo bgWhite disFx marginTop">
                    <div
                        onClick={()=>this.setState({isAddVoice:true})}
                        className="fx1 center borderRight padding"
                    >添加语音
                    </div>
                    <div
                        onClick={()=>this.addPicEvent()}
                        className="fx1 center padding"
                    >添加图片</div>
                </div>
                <div className="buttonContainer center">
                    <Button onClick={()=>{this.goBack()}} style={{width:'90%'}} />
                </div>
                </div>
                {
                    this.state.isAddVoice ?
                        <Modal1
                            isComplated={this.state.isComplated}
                            isRecording={this.state.isRecording}
                            onClick={()=>this.addVoice()}
                            onCancel={()=>{this.state.isComplated=false;this.setState({isAddVoice:false})}}
                            upLoadVoice={()=>{this.upLoadVoice()}}
                        />:null
                }
                {
                    this.state.isAddPic ? <Modal1 onClick={()=>this.addPicEvent()}  type={1} onCancel={()=>{this.setState({isAddPic:false})}} />:null
                }
                {
                    this.state.isShowFailInfo ? <Modal
                        onCancel={()=>this.setState({isShowFailInfo:false})}
                        onConfirm={()=>this.setState({isShowFailInfo:false})}
                    >信息提交失败</Modal> : null
                }
                {
                    this.state.isShowVoiceInfo ? <Modal
                        onCancel={()=>this.setState({isShowVoiceInfo:false})}
                        onConfirm={()=>this.setState({isShowVoiceInfo:false})}
                    >无音频授权，无法录音！</Modal> : null
                }
                {
                    this.state.isShowVoiceComplateInfo ? <Modal
                        onCancel={()=>this.setState({isShowVoiceComplateInfo:false})}
                        onConfirm={()=>this.setState({isShowVoiceComplateInfo:false})}
                    >录音超过一分钟自动完成</Modal> : null
                }
            </div>
        )
    }
}

export default connect((store)=>{
    return {
        taskStore:store.taskStore
    }
})(TaskContent);