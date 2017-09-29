/**
 * Created by mapbar_front on 2017/9/6.
 */
import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;

import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskDetail.css'
import TopBanner from '../../components/TopBanner';
import ViewForRightDom from '../../components/ViewForRightDom';
import Modal2 from '../../components/Modal2';

import { getTaskFinishedList,findTaskSubjectById,findTaskFinishedById,deleteTaskFinished,saveFinishedComment,deleteFinishedComment,saveFinishedPraise,deleteFinishedPraise } from '../../services/AppServices';
import { deleteItemByIndex } from '../../assets/utils/utils';
export default class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'',//作业标题
            taskContent:'',//作业内容
            compoleteNumber:0,
            numberList:[],//成员列表
            taskPicsList:[],
            taskVoiceList:[],
            isShowDelete:false,
            currentPageIndex:1
        }
    }
    deleteEvent(){
        //console.log(this.state.numberList,this.state.currentDeleteIndex)
        //const arr = deleteItemByIndex(this.state.numberList,this.state.currentDeleteIndex);
        let _this = this;
        let taskFinishedId = this.state.numberList[this.state.currentDeleteIndex].id;
        deleteTaskFinished(taskFinishedId).then(res => {
            _this.fetchData();
            _this.setState({
                isShowDelete: false
            })
        })

    }

    /**
     * @todo:后台没有点赞重复判断的操作。
     * @param id
     */
    pramiseEvent(id){
        !this.time && (this.time = new Date().getTime()-2000);
        if(new Date().getTime() - this.time < 2000){
            return
        }
        this.time = new Date().getTime();
        let userId = 100;

        saveFinishedPraise(id,userId).then(res => {
            this.fetchData();
        })
    }

    /**
     * @todo:目前没有进行删除点赞的操作。
     * @param id
     */
    deletePramiseEvent(id){
        !this.Dtime && (this.Dtime = new Date().getTime()-2000);
        if(new Date().getTime() - this.Dtime < 2000){
            return
        }
        this.Dtime = new Date().getTime();
        deleteFinishedPraise(id).then(res => {
            this.fetchData();
        })
    }
    speakEvent(){
        let index = this.state.commentsIndex;
        let taskFinishedId = this.state.numberList[index].id;
        saveFinishedComment(this.state.commentsValue,taskFinishedId).then(res => {
            res = JSON.parse(res);
            console.log('saveFinishedComment',res);
            this.setState({isSpeak:false},()=>{
                this.fetchData();
            });
        })
    }
    deleteComments(id){
        deleteFinishedComment(id).then(res => {
            res = JSON.parse(res);
            console.log('deleteFinishedComment',res);
            this.fetchData();
        })
    }
    fetchMoreDate(){
        this.setState({
            currentPageIndex: this.state.currentPageIndex + 1
        },()=>{
            this.fetchData(this.state.currentPageIndex);
        });

    }
    fetchData(pageNumber = 1,rowsNumber = 100){
        let taskSubjectId = this.props.match.params.id;
        let page = pageNumber;
        let rows = rowsNumber;
        getTaskFinishedList(taskSubjectId,page,rows).then(res => {
            res = JSON.parse(res);
            console.log('getTaskFinishedList',res);
            this.setState({
                compoleteNumber:res.total,
                numberList:res.rows,//this.state.numberList.concat(res.rows)
            })
        });
        findTaskFinishedById(taskSubjectId).then(res => {
            res = JSON.parse(res);
            console.log('findTaskFinishedById',res);
            this.setState({

            })
        });
        findTaskSubjectById(taskSubjectId).then(res => {
            res = JSON.parse(res);
            console.log('findTaskSubjectById',res);
            this.setState({
                taskTitle:res.subject,
                taskContent:res.content,
                taskPicsList: res.taskPicsList,
                taskVoiceList: res.taskVoiceList
            })
        });
    }
    componentDidMount(){

        this.fetchData();
    }
    renderSpeak(){
        return (
            <div className="rowCenter" style={{width:'100%',height:'50px',backgroundColor:'#f1f1f1',justifyContent:'space-around'}}>

                <img className="iconDefault" style={{width:'40px',height:'25px'}} src={require("../../assets/images/speaks.png")} />
                <input
                    type="text"
                    placeholder="请输入评论"
                    className="inputDefault paddingLeft"
                    style={{width:"60%",height:'30px',backgroundColor:'#cccccc',borderRadius:'5px'}}
                    onChange={(e) => {this.setState({commentsValue:e.target.value})}}
                />
                <span
                    className="colorWhite bgOrange paddingLeft paddingRight"
                    style={{borderRadius:'10px',padding:'3px 10px'}}
                    onClick={()=>this.speakEvent()}
                >发送</span>
            </div>
        )
    }
    render(){
        return (
            <div className="pageBox boxSizing">
                <TopBanner title="作业详情" router={this.props.history} />
                <div className="fx1 bgWhite borderTop boxSizing" style={{overflow:'auto'}}>
                    <div className="detail boxSizing">
                        <div className='center marginTop'>
                            <img className="img" src={require("../../assets/images/userImg.png")} />
                        </div>
                        <div className="center padding">{this.state.taskTitle||'任务标题'}</div>
                        <div
                            className="title margin padding note smallSize"
                            style={{marginTop:0,paddingTop:0}}
                        >
                            {this.state.taskContent||'任务内容'}
                        </div>
                    </div>
                    <div className="taskPic boxSizing">
                        {
                            this.state.taskPicsList.map((item,index) => {
                                return (
                                    <div key={index} className="taskImgBox boxSizing padding">
                                        <img
                                            className="imgDefault boxSizing"
                                            src={serviceUrl + item.fullPath}
                                            alt="作业图片展示"
                                        />
                                    </div>
                                )

                            })
                        }

                    </div>
                    <div className="taskVoice boxSizing">

                        {
                            this.state.taskVoiceList.map((item,index) => {
                                return (
                                    <audio key={index} className="voiceBox marginTop" controls>
                                        <source src={serviceUrl + item.fullPath} type="audio/mpeg" />
                                    </audio>
                                )
                            })
                        }
                    </div>
                    <div className="note smallSize center padding" style={{backgroundColor:'#f1f1f1'}}>
                        ---- {this.state.compoleteNumber ? this.state.compoleteNumber+"人提交":"暂无提交"} ----
                    </div>

                    <div className="list boxSizing padding">
                    {
                        this.state.numberList.map((item,index) => {
                            return (
                                <div key={index} className="item disFx boxSizing borderBottom paddingBottom paddingTop">
                                    <div className="itemLeft">
                                        <img src={item.user && item.user.headImgUrl || require('../../assets/images/userImg.png')} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
                                    </div>
                                    <div className="itemRight fx1">
                                        <div className="disFx">
                                            <div className="fx1">
                                                <p className="colorNote1 baseSize">{item.user && item.user.nickname||'山花烂漫时'}</p>
                                                <p className="colorNote smallSize">{item.time||'2017-09-23 12:02:23'}</p>
                                            </div>
                                            <div onClick={()=>{this.setState({isShowDelete:true,currentDeleteIndex:index})}} className="bigSize marginRight">...</div>
                                        </div>
                                        <p className="marginTop">{item.content}</p>
                                        <div>

                                        </div>
                                        <div className="theImages boxSizing disFx marginTop">
                                            {
                                                item.taskPicsList.map((i,idx)=>{
                                                    return (
                                                        <img
                                                            key={idx}
                                                            className="marginRight marginButtom"
                                                            style={{width:'70px',height:'70px'}}
                                                            src={serviceUrl + i.fullPath}
                                                        />
                                                    )
                                                })
                                            }

                                        </div>
                                        <div className="">
                                            {
                                                item.taskVoiceList.map((every,idx) => {
                                                    return (
                                                        <audio key={idx} className="voiceBox marginTop" controls>
                                                            <source src={serviceUrl + every.fullPath} type="audio/mpeg" />
                                                        </audio>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="padding disFx">
                                            <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                <img onClick={()=>this.setState({isSpeak:true,commentsIndex:index})} src={require("../../assets/images/comments.png")} className="iconDefault" /><span className="marginLeft">点评</span>
                                            </div>
                                            <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                <img onClick={()=>this.pramiseEvent(item.id)} src={require("../../assets/images/pramise.png")}  className="iconDefault" /><span className="marginLeft">{item.praiseCount}</span>
                                            </div>
                                        </div>
                                        {
                                            item.commentList.map((item,idx)=>{
                                                return (
                                                    <div key={idx} className="border marginRight">
                                                        <p className="commentsStyle note">
                                                            <span className="commentsName">{item.id || 'liwudi'}</span>
                                                            <span className="commentsContent">: {item.content}</span>
                                                            <view className="cicleStyle" onClick={()=>{this.deleteComments(item.id)}}>
                                                                <view className="cicleRow"></view>
                                                                <view className="cicleColumn"></view>
                                                            </view>
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    {
                        this.state.compoleteNumber/10 > this.state.currentPageIndex ? <div onClick={() => this.fetchMoreDate()} className="padding center colorMain marginButtom">查看更多</div>:<div className="padding center colorNote marginButtom">没有更多了</div>

                    }


                </div>
                {
                    this.state.isShowDelete?
                        <Modal2 onCancel={()=>this.setState({isShowDelete:false})} >
                            <ViewForRightDom title="删除" onClick={()=>this.deleteEvent()} />
                            <div
                                className="center bgWhite"
                                style={{width:'100%',height:"50px",borderTop:'10px solid #cccccc'}}
                                onClick={()=>this.setState({isShowDelete:false})}
                            >
                                取消
                            </div>
                        </Modal2>:null
                }
                {
                    this.state.isSpeak ? this.renderSpeak() : null
                }
            </div>
        )
    }
}

