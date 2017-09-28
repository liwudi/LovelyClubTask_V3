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
import { saveTaskFinished,dloadVoice,dloadImg,getVoiceByServerId,getImgByServerId } from '../../services/AppServices';


import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;

class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            taskSubjectId: props.match.params.taskSubjectId,
            willAddVoiceList:[],
            addImageList:[]
        }
    }
    fetchData(){
        let content = this.state.inputValue;
        let taskSubjectId = Number(this.state.taskSubjectId) || 1;
        let userId = 100;
        saveTaskFinished(content,taskSubjectId,userId).then(res => {
            console.log('saveTaskFinished',res);
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
    goBack(){
        console.log(this.props.match.params.taskSubjectId);

        if(this.props.match.params.taskSubjectId != 'false'){
            //在提交作业的情况下
            this.fetchData();
        }else{
            //在编辑作业的情况下

            this.props.dispatch(TaskActions.taskContent(this.state.inputValue));
            this.props.history.goBack();
        }

    }
    addVoice(){
        this.isComplated = false;
        if(this.isRecording){
            alert("执行录音结束end事件");
            this.addVoiceEndEvent();
        }else{
            alert('开始执行录音start');
            this.addVoiceStartEvent();
        }
    }

    addVoiceStartEvent(){
        let _this = this;
        wx.startRecord({
            success: function () {
                _this.isRecording = true;
                console.log('录音成功');

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
                voice.localId = res.localId;
                //alert('录音时间已超过一分钟');
                _this.setState({
                    isShowVoiceComplateInfo: true
                })
                //Todo:上传语音id得到serverId
                _this.upLoadVoice(localId,taskFinishedId);
            }
        });
    }

    addVoiceEndEvent(){
        let taskFinishedId = '1';
        wx.stopRecord({
            success: function (res) {
                _this.isRecording = false;
                let localId = res.localId;
                alert("录音结束>>"+localId);
                //Todo:上传语音id得到serverId
                _this.upLoadVoice(localId,taskFinishedId);
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }
    upLoadVoice(localId,taskFinishedId){
        wx.upLoadVoice({
            localId:localId,
            success: function (res) {
                let serverId = res.serverId;
                this.isComplated = true;
                let id = -(Math.floor(Math.random()*100000)+10000);
                dloadVoice(serverId,id).then(res => {
                    getVoiceByServerId(serverId).then(res => {
                        //声音下载到本地
                        let url = serviceUrl + res.fullPath;
                        _this.setState({
                            willAddVoiceList:_this.state.willAddVoiceList.concat([url])
                        })
                    })
                })
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
                            let id = -(Math.floor(Math.random()*100000)+10000);
                            dloadImg(serverId,id).then(res => {
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
                let id = -(Math.floor(Math.random()*100000)+10000);
                dloadImg(serverId,id).then(res => {
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
                                    <source src={willAddVoiceList[index]} type="audio/mpeg" />
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
                    this.state.isAddVoice ? <Modal1 isComplated={this.isComplated} isRecording={this.isRecording} onClick={()=>this.addVoice()} onCancel={()=>{this.isComplated=false;this.setState({isAddVoice:false})}} />:null
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