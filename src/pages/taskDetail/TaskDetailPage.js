/**
 * Created by mapbar_front on 2017/9/6.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskDetail.css'
import TopBanner from '../../components/TopBanner';
import ViewForRightDom from '../../components/ViewForRightDom';
import Modal2 from '../../components/Modal2';

import { getTaskFinishedList,findTaskSubjectById } from '../../services/AppServices';
import { deleteItemByIndex } from '../../assets/utils/utils';
export default class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'数学',
            taskContent:'我是一个小逗比，咿呀咿呀咦！！',
            compoleteNumber:3,
            numberList:[],
            taskPicsList:[],
            taskVoiceList:[],
            isShowDelete:false
        }
    }
    deleteEvent(){
        //console.log(this.state.numberList,this.state.currentDeleteIndex)
        const arr = deleteItemByIndex(this.state.numberList,this.state.currentDeleteIndex);

        this.setState({numberList:arr,isShowDelete:false});
    }
    fetchData(){
        let taskSubjectId = this.props.match.params.id;
        let page = 1;
        let rows = 10;
        getTaskFinishedList(taskSubjectId,page,rows).then(res => {
            res = JSON.parse(res);
            console.log('getTaskFinishedList',res);
            this.setState({
                compoleteNumber:res.total,
                numberList:res.rows

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
                <input type="text" placeholder="请输入评论" className="inputDefault paddingLeft" style={{width:"60%",height:'30px',backgroundColor:'#cccccc',borderRadius:'5px'}} />
                <span
                    className="colorWhite bgOrange paddingLeft paddingRight"
                    style={{borderRadius:'10px',padding:'3px 10px'}}
                    onClick={()=>this.setState({isSpeak:false})}
                >发送</span>
            </div>
        )
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="作业详情" router={this.props.history} />
                <div className="fx1 bgWhite borderTop" style={{overflow:'auto'}}>
                    <div className="detail">
                        <div className='center marginTop'>
                            <img className="img" src={require("../../assets/images/TaskDetail.jpg")} />
                        </div>
                        <div className="center padding">{this.state.taskTitle||'任务标题'}</div>
                        <div
                            className="title margin padding note smallSize"
                            style={{marginTop:0,paddingTop:0}}
                        >
                            {this.state.taskContent||'任务内容'}
                        </div>
                    </div>
                    <div className="note smallSize center padding" style={{backgroundColor:'#f1f1f1'}}>
                        ---- {this.state.compoleteNumber ? this.state.compoleteNumber+"人提交":"暂无提交"} ----
                    </div>
                    <img src="http://homework.shsoapp.com:8888/ttzyservice/task/showImg?path=/Users/caochunpeng/temp/alarm.png"/>
                    {
                        this.state.taskPicsList.map((item,index)=>{
                            
                        })
                    }
                    {
                        this.state.numberLis && this.state.numberList.map((item,index)=>{
                            return (
                                <div key={index} className="list padding">
                                    <div className="item disFx borderBottom paddingBottom">
                                        <div className="itemLeft">
                                            <img src={item.imageUrl} style={{width:'30px',height:'30px',borderRadius:'50%'}}/>
                                        </div>
                                        <div className="itemRight fx1">
                                            <div className="disFx">
                                                <div className="fx1">
                                                    <p className="colorNote1 baseSize">{item.title}</p>
                                                    <p className="colorNote smallSize">{item.time}</p>
                                            </div>
                                                <div onClick={()=>{this.setState({isShowDelete:true,currentDeleteIndex:index})}} className="bigSize marginRight">...</div>
                                            </div>
                                            <p className="marginTop">{item.content}</p>
                                            <div>

                                            </div>
                                            <div className="taskImages disFx marginTop">
                                                {
                                                    item.taskImage.map((i,idx)=>{
                                                        return (
                                                            <img
                                                                key={idx}
                                                                className="marginRight"
                                                                style={{width:'70px',height:'70px'}}
                                                                src={i}
                                                            />
                                                        )
                                                    })
                                                }

                                            </div>
                                            <div className="padding disFx">
                                                <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                    <img onClick={()=>this.setState({isSpeak:true})} src={require("../../assets/images/comments.png")} className="iconDefault" /><span onClick={()=>this.setState({isSpeak:true})} className="marginLeft">点评</span>
                                                </div>
                                                <div className="rowCenter" style={{width:'100%',height:'40px',overflow:'hidden'}}>
                                                    <img src={require("../../assets/images/pramise.png")}  className="iconDefault" /><span className="marginLeft">3</span>
                                                </div>
                                            </div>
                                            {
                                                item.comments.map((item,idx)=>{
                                                    return (
                                                        <div key={idx} className="border marginRight">
                                                            <p className="padding margin">
                                                                <span>{item.name}:</span>
                                                                <span>{item.content}</span>
                                                            </p>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        })
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