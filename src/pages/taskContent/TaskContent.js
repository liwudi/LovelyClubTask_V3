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
import { saveTaskFinished,dloadVoice,dloadImg,getVoiceByServerId,getImgByServerId,taskSubject_dloadVoice,taskSubject_dloadImg } from '../../services/AppServices';


import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;

class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            taskSubjectId: props.match.params.taskSubjectId,
            willAddVoiceList:[],
            addImageList:[],
            id: -(Math.floor(Math.random()*100000)+10000)
        }
    }
    fetchData(){
        let content = this.state.inputValue;
        let taskSubjectId = Number(this.state.taskSubjectId) || 1;
        //alert(localStorage.getItem('userInfo'));
        let userId = JSON.parse(localStorage.getItem('userInfo')).openId;
        //alert(userId);
        saveTaskFinished(content,taskSubjectId,userId,this.state.id).then(res => {
            console.log('saveTaskFinished',res);
            alert('成功的保存了作业，上传的id是'+this.state.id);
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
    renderContent(){
        return (
            <div>
                <textarea onChange={(e)=>{this.setState({inputValue:e.target.value})}} placeholder="请输入作业内容" className="textArea"></textarea>
            </div>
        )
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
        console.log(this.props.match.params.taskSubjectId);

        if(this.props.match.params.taskSubjectId != 'false'){
            //在提交作业的情况下
            this.fetchData();
        }else if(this.props.match.params.taskSubjectId == 'false'){
            //在布置作业的情况下

            this.props.dispatch(TaskActions.taskContent(this.state.inputValue));
            this.props.dispatch(TaskActions.taskSubjectId(this.state.id));
            this.props.history.goBack();
        }

    }
    addVoice(){
        let _this = this;
        //this.isComplated = false;
        this.setState({
            isComplated: false
        })
        if(this.state.isRecording){
            alert("执行录音结束end事件");
            this.addVoiceEndEvent();
        }else{
            alert('开始执行录音start');
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

                alert('录音成功start'+res);

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
                alert('录音时间已超过一分钟>>'+res.localId);
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
                //_this.isRecording = false;
                _this.localId = res.localId;
                _this.setState({
                    isRecording: false,
                    isComplated: true
                });


                alert("录音结束EndEvent>>"+_this.localId);
                //Todo:上传语音id得到serverId
                //_this.upLoadVoice(localId,taskFinishedId);


            },
            fail: function (err) {
                alert("录音结束EndEvent>>"+err);
                alert(JSON.stringify(res));
            }
        });
    }
    upLoadVoice(){
        alert('录音结束了，开始长传语音')
        let _this = this;
        alert('当前上传的localId>>'+_this.localId);
        alert('当前上传localId>>的类型'+(typeof _this.localId));

        wx.uploadVoice({
            localId:_this.localId+"",
            success: function (res) {
                let serverId = res.serverId;
                //this.isComplated = true;
                alert('上传语音成功，关闭右边的对号，下面自动调用下载语音>>serverID'+serverId);
                //分几种情况，在交作业情况下
                if(_this.props.match.params.taskSubjectId != 'false'){
                    finishTask()
                }else if(_this.props.match.params.taskSubjectId == 'false'){//在布置作业情况下
                     task();
                }
                function task() {
                    taskSubject_dloadVoice(serverId,_this.state.id).then(res => {
                        alert('服务端已经下载好语音了')
                        getVoiceByServerId(serverId).then(res => {
                            //声音下载到本地
                            alert("声音下载到本地"+res);
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
                function finishTask() {
                    dloadVoice(serverId,_this.state.id).then(res => {
                        alert('服务端已经下载好语音了')
                        getVoiceByServerId(serverId).then(res => {
                            //声音下载到本地
                            alert("声音下载到本地"+res);
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

            },
            fail: function (err) {
                alert('上传语音失败'+err);
            }
        })
    }
    addPicEvent(){

        this.chooseImage();
    }
    chooseImage(){
        let _this = this;
        wx.chooseImage({
            success: function (res) {

                let localIds = res.localIds;

                let i = 0, length = localIds.length;
                //upload();
                function upload() {
                    alert('开始上传图片'+i);
                    alert('这是的localId是》》'+localIds[i]);
                    wx.upLoadImage({
                        localId: localIds[i],
                        isShowProgressTips: 1,
                        success: function (res) {
                            alert('上传图片成功，serverid>>'+res.serverId);
                            i++;
                            if (i < length) {
                                upload();
                            }
                            let serverId = res.serverId;
                            //交作业
                            if(_this.props.match.params.taskSubjectId != 'false'){
                                finishTask_img()
                            }else if(_this.props.match.params.taskSubjectId == 'false'){
                                //布置作业
                                task_img();
                            }
                            function finishedTask_img() {
                                dloadImg(serverId,_this.state.id).then(res => {
                                    getImgByServerId(serverId).then(res => {
                                        alert('获取图片成功')
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
                                        alert('获取图片成功')
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
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                //将上传的图片下载到本地服务器
                if(_this.props.match.params.taskSubjectId != 'false'){
                    //在提交作业的情况下
                    finishTask();
                }else if(_this.props.match.params.taskSubjectId == 'false'){
                    //在布置作业情况下
                    setTask();
                }
                function finishTask() {
                    dloadImg(serverId,_this.state.id).then(res => {
                        alert('后台已经从服务器上下载了图片');
                        alert('此时再用serverId取服务端图片》》'+serverId);
                        getImgByServerId(serverId).then(res => {
                            //图片下载到本地
                            res = JSON.parse(res);
                            alert('下载到本地的图片路径>>>>>'+res.fullPath);
                            let url = serviceUrl + res.fullPath;

                            alert(_this.state.addImageList.concat([url]));
                            _this.setState({
                                addImageList:_this.state.addImageList.concat([url])
                            });
                        }).catch(err => {
                            alert('没有下载到本>>>>'+err);
                        })
                    });
                }
                function setTask() {
                    dloadImg(serverId,_this.state.id).then(res => {
                        alert('后台已经从服务器上下载了图片');
                        alert('此时再用serverId取服务端图片》》'+serverId);
                        getImgByServerId(serverId).then(res => {
                            //图片下载到本地
                            res = JSON.parse(res);
                            alert('下载到本地的图片路径>>>>>'+res.fullPath);
                            let url = serviceUrl + res.fullPath;

                            alert(_this.state.addImageList.concat([url]));
                            _this.setState({
                                addImageList:_this.state.addImageList.concat([url])
                            });
                        }).catch(err => {
                            alert('没有下载到本>>>>'+err);
                        })
                    });
                }
            }
        });
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