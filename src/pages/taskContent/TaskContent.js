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
            willAddImageList:[]
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
        alert('开始录音');
        this.isComplated = false;
        if(this.isRecording){
            this.addVoiceEndEvent();
        }else{
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
                alert('录音时间已超过一分钟');
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
                getVoiceByServerId(serverId).then(res => {
                    //声音下载到本地
                    let url = serviceUrl + res.fullPath;
                    _this.setState({
                        willAddVoiceList:_this.state.willAddVoiceList.concat([url])
                    })
                })
            }
        })
    }
    addPicEvent(){
        //alert('开始上传图片')
        this.chooseImage();
    }
    chooseImage(){
        let _this = this;
        wx.chooseImage({
            success: function (res) {
                //images.localId = res.localIds;
                //alert('已选择 ' + res.localIds.length + ' 张图片');
                var localIds = res.localIds;


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
        let taskFinishedId = '1';
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                alert("uploadImage success!  serverId >>>>"+serverId);
                //将上传的图片下载到本地服务器

                getImgByServerId(serverId).then(res => {
                    //图片下载到本地
                    alert('下载到本地的res',res);
                    let url = serviceUrl + res.fullPath;
                    _this.setState({
                        willAddImageList:_this.state.willAddImageList.concat([url])
                    })
                }).catch(err => {
                    alert('没有下载到本地',err);
                })
                // $.ajax({
                //     //url : 'http://homework.shsoapp.com/testweixin/DloadImgServlet',
                //     url : 'http://homework.shsoapp.com/ttzyservice/task/dloadImg',
                //     type : 'GET',
                //     dataType : 'json',
                //     data : {
                //         serverId : serverId,
                //         taskFinishedId : '1'
                //     },
                //     success : function(data) {
                //         alert('图片已下载到本地！'+data);
                //
                //     }
                // });


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
                        this.state.willAddImageList.map((item,index) => {
                            return (
                                <div className="upLoadImageBox" key={index}>
                                    <img className="upLoadImage" src={willAddImageList[index]} alt="上传图片" />
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