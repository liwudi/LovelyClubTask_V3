/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../../css/common.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';
import ViewForRightDom from '../../components/ViewForRightDom';


import { getuserInfo } from '../../getUserInfo';
import { connect } from 'react-redux';
import {
    TYPES,
    TaskActions,
    ContentInput
} from '../../actions/index';
import { getTaskSubjectList,deleteTaskSubject } from '../../services/AppServices';
import './css/HomePage.css';

import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            total:0,
            pageNumber:1,
            tasks:[{

            }],

            connect:false,//推送提示相关

            isShowModal:false,
            //离开页面的时候要把关闭遮罩层
            currentIndex:0,

            userInfo: localStorage.getItem('userInfo')
        }
    }
    getUserInfo(){
        getuserInfo().then(res => {
            this.setState({
                userInfo: res
            })
        })
    }
    closeShowModal(){
        this.setState({
            isShowModal:false
        })
    }
    deleteEvent(){
        let subjectId = this.state.tasks[this.state.editIndex].id;
        console.log('subjectId',subjectId);
        deleteTaskSubject(subjectId).then(res => {
            console.log(res);
            this.fetchData(this.closeShowModal());
        })
    }
    editEvent(){
        let subjectId = this.state.tasks[this.state.editIndex].id;
        this.props.dispatch(TaskActions.taskId(subjectId));
        this.props.dispatch(TaskActions.taskTitle(''));
        this.props.dispatch(TaskActions.taskContent(''));
        this.props.dispatch(TaskActions.taskSubjectId(''));

        //处理作业的输入
        this.props.dispatch(ContentInput.contentInput(''));


        this.props.history.push(`/setTaskPage/${true}`);
    }
    setTaskEvent(){
        this.props.dispatch(TaskActions.taskId(''));
        this.props.dispatch(TaskActions.taskTitle(''));
        this.props.dispatch(TaskActions.taskContent(''));
        this.props.dispatch(TaskActions.taskSubjectId(''));


        //处理作业的输入
        this.props.dispatch(ContentInput.contentInput(''));
        

        this.props.history.push(`/setTaskPage/${false}`);
    }
    gotoDetailEvent(index){
        //alert(index);
        let id = this.state.tasks[index].id;
        //alert(id);
        this.props.history.push(`/taskDetail/${id}`)
    }
    getCardEvent(id,this_subject,this_content){
        console.log('获取的id是'+id);
        document.getElementById('subjectid').value = id;

        let subjectid = id;
        let subject = this_subject;
        let content = this_content;
        // initJssdk();
        // this.props.history.push(`/taskCard/${id}`);
        window.location.href=`${serviceUrl}/toIndex2.jsp?subjectid=${subjectid}&subject=${subject}&content=${content}`;
    }
    fetchMoreData(next){

        let rows = 10;
        getTaskSubjectList(this.state.pageNumber+1,rows).then(res => {
            res = JSON.parse(res);
            this.setState({
                total:res.total,
                tasks:this.state.tasks.concat(res.rows),
                pageNumber: this.state.pageNumber + 1
            },() => {
                next && next();
            });
        });
    }
    fetchData(next){
        getTaskSubjectList().then(res=>{
            res = JSON.parse(res);
            console.log('getTaskSubjectList',res);
            this.setState({
                total:res.total,
                tasks:res.rows
            },() => {
               next && next();
            });
        })
    }
    componentDidMount(){
        this.fetchData();
        this.isGotoMyTask();
        this.getUserInfo();
    }
    isGotoMyTask(){

        if(state){
            this.props.history.replace(`/mytask/${state}`);
        }else{
            return
        }
    }

    renderContent(){
        if(this.state.tasks.length == 0){
            return (
                <div>
                    <p className="center note">暂未布置作业，点击下方按钮为</p>
                    <p className="center note">你的学员布置作业</p>
                </div>
            )
        }else{
            return (
                <div className="fx1 fix fxColumn" style={{width:"100%",height:"100%"}}>
                    {
                        this.state.tasks.map((item,index) => {
                            return (
                                <div key={index} className="marginTop marginLeft marginRight bgWhite">
                                    <div onClick={()=>{this.gotoDetailEvent(index)}} className="baseInfo padding">
                                        <p>{item.subject}</p>
                                        <p className="note smallSize marginTop">{item.content}</p>
                                        <p className="note smallSize marginTop"><span className="colorRed">{item.submited || 0}</span>人已交作业</p>
                                    </div>
                                    <div className="functionLink disFx paddingTop paddingBottom" style={{backgroundColor:'#f9f9f9',color:"#999999"}}>
                                        <p onClick={()=>{this.getCardEvent(item.id,item.subject,item.content)}} className="fx1 center borderRight">获取作业卡</p>
                                        <p onClick={()=>{this.setState({isShowModal:true,editIndex:index})}} className="fx1 center">设置</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.total/10 > this.state.pageNumber ? <div className="loadMore center">
                            <span onClick={()=>this.fetchMoreData()}>加载更多...</span>
                        </div>:<div className="loadMore center">
                            <span style={{color:'#999999'}} onClick={()=>this.fetchMoreData()}>没有更多了</span>
                        </div>
                    }


                </div>
            )
        }
    }
    //提示推送信息
    showPrompt(){
        return (
            <div className="bgBlack padding" style={{position:"absolute",left:"25%",top:"35%",zIndex:100,width:"50%"}}>
                <p className="colorWhite center">该作业未关联课程，不能</p>
                <p className="colorWhite center marginTop">进行推送操作</p>
            </div>
        )
    }
    //遮罩层
    showModal(){
        return (
            <div className="fx1 disFx" style={{flexDirection:"column",backgroundColor:"rgba(0,0,0,0.5)",position:'absolute',left:0,top:0,zIndex:100,width:"100%",height:"100%"}}>
                <div className="fx1"></div>
                <div className="bgWhite">
                    <ViewForRightDom title="编辑" onClick={()=>this.editEvent()} />
                    <ViewForRightDom title="删除" onClick={()=>this.deleteEvent()} />
                    <div
                        className="center bgWhite"
                        style={{width:'100%',height:"50px",borderTop:'10px solid #cccccc'}}
                        onClick={()=>this.setState({isShowModal:false})}
                    >
                        取消
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div className="pageBox" style={{position:'relative'}}>
                <TopBanner title="作业管理" router={this.props.history} />
                <div className="fx1 boxSizing center" style={{overflow:'auto',borderTop:'1px solid #cccccc'}}>
                    {
                        this.renderContent()
                    }
                </div>
                <NewTask style={{borderTop:'1px solid #cccccc'}}>
                    <span onClick={() => this.setTaskEvent()}>布置作业</span>
                </NewTask>
                {
                    this.state.connect?this.showPrompt():null
                }
                {
                    this.state.isShowModal?this.showModal():null
                }
            </div>
        )
    }
}


export default connect((store) => {
    console.log(store);
    return {
        store: store
    }
})(HomePage);