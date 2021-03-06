/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../css/common.css';
import '../../css/setTaskPage.css';
import TopBanner from '../../components/TopBanner';
import Modal from '../../components/Modal';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import { findTaskSubjectById,saveTaskSubject,updateTaskSubject } from '../../services/AppServices';

import { getuserInfo } from '../../getUserInfo';


import serverConfig from '../../config';
const serviceUrl = serverConfig.server.main_url;


import {
    TYPES,
    TaskActions
} from '../../actions/index';
class SetTaskPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:props.taskStore.taskTitle,
            taskSubjectId:props.taskStore.taskSubjectId,
            isChecked:false,
            isShowModal:false,
            taskContent:props.taskStore.taskContent,
            userInfo:null
        }
    }
    getUserInfo(){
        getuserInfo().then(res => {
            this.setState({
                userInfo: res
            })
        })
    }
    getCardEvent(){

        let id = Number(this.props.taskStore.taskId);//这个是taskId，代表的编辑作业的taskSubjectId，代表的是布置作业的那个dispatch的负值
        let userid = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).openId || this.state.userInfo.openId;
        let subject = this.props.taskStore.taskTitle || this.state.taskTitle;
        let content = this.props.taskStore.taskContent || this.state.taskContent;
        let ids = this.props.taskStore.taskSubjectId || this.state.taskSubjectId;//这个

        console.log('这个时候的subject',subject,content);
        console.log('这个时候的content',content);
        if(subject&&content){
            //更新作业题目，id是正值。
            //alert('this.isGetFromEdit()'+this.isGetFromEdit());
            this.isGetFromEdit() && updateTaskSubject(subject,content,id,userid).then(res => {
                this.props.history.goBack();
            });

            //alert('id'+id);
            //布置作业题目获取作业卡，id是负值
            !this.isGetFromEdit() && saveTaskSubject(subject,content,userid,id).then(res => {
                res = JSON.parse(res);
                console.log('saveTaskSubject',res);
                //this.props.history.push(`/taskCard/{false}`);
                let subjectid = id;
                if(res.result.id){
                    subjectid = res.result.id;
                }

                window.location.href=`${serviceUrl}/toIndex2.jsp?subjectid=${subjectid}&subject=${subject}&content=${content}`
            });
        }else{
            this.setState({
                isNullContent: true
            })
        }

    }

    /**
     * @info:目前这个切换的tab是没用的
     */
    changeStateEvent(){
        return;
        this.setState({
            isChecked:!this.state.isChecked
        })
    }
    isGetFromEdit(){
        console.log(this.props.match.params.isEditPage);
        if(this.props.match.params.isEditPage === 'true'){
            return true
        }else{
            return false
        }
        //return Boolean(this.props.match.params.isEditPage);
    }
    gotoTaskContent(){
        let content = this.props.taskStore.taskContent || this.state.taskContent;
        //this.props.history.push(`/taskContent/${false}`);
        let editString = JSON.stringify({type:3,taskId:this.props.taskStore.taskId,taskContent:content});
        let notEditString = JSON.stringify({type:1});

        this.isGetFromEdit() && this.props.history.push(`/taskContent/${editString}`);
        !this.isGetFromEdit() && this.props.history.push(`/taskContent/${notEditString}`);
    }
    confirmEvent() {
        const dealInput = (value) => {
            this.props.dispatch(TaskActions.taskTitle(value));
            this.setState({
                isShowModal:false
            })
        };
        this.state.inputValue && dealInput(this.state.inputValue);
    }
    cancelEvent(){
        this.setState({isShowModal:false})
    }
    fetchData(){
        findTaskSubjectById(this.props.taskStore.taskId).then(res => {
            console.log('获取的数据',res);
            res = JSON.parse(res);
            //this.props.dispatch(TaskActions.taskTitle(res.subject));
            this.setState({
                taskTitle:res.subject,
                taskContent:res.content
            })
        })
    }

    componentDidMount(){
        this.isGetFromEdit() && this.fetchData();//来自编辑的界面的话，还是需要获取额外的数据的
        this.getUserInfo();
    }

    renderTab(){
        if(this.state.isChecked){
            return (
                <div className="center" onClick={()=>this.changeStateEvent()}>
                    <div className="switchChecked">
                        <div className="switchCicleChecked"></div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="center" onClick={()=>this.changeStateEvent()}>
                    <div className="switch">
                        <div className="switchCicle"></div>
                    </div>
                </div>
            )
        }
    }


    render(){
        const _rightView =  () => {
            return (
                <div className="rowCenter">
                    <span className="note textAlign one-line">{this.props.taskStore.taskTitle || this.state.taskTitle || '请输入标题'}</span>
                    <img className="iconRightArrow" src={require("../../assets/images/rightArrow.png")} />
                </div>
            )

        };
        const _rightViewContent = () => {
            return (
                <div className="rowCenter">
                    <span className="note textAlign one-line">{this.props.taskStore.taskContent || this.state.taskContent || '请输入内容'}</span>
                    <img className="iconRightArrow" src={require("../../assets/images/rightArrow.png")} />
                </div>
            )
        };
        return(
            <div className="pageBox" style={{position:'relative'}}>
                <TopBanner title="布置作业" router={this.props.history}/>
                <div className="myContent">
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='作业标题'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            rightView={()=>_rightView()}
                            onClick={()=>this.setState({isShowModal:true})}
                        />
                        <ViewForRightArrow
                            title='作业内容'
                            onClick={()=>{this.gotoTaskContent()}}
                            rightView={()=>_rightViewContent()}
                            style={{justifyContent:'space-between'}}
                        />
                    </div>

                </div>
                <div className="buttonContainer center">
                    <div
                        className="bigBtn center bgred"

                        onClick={()=>{this.getCardEvent()}}
                    >保存并且获取作业卡</div>
                </div>
                {
                    this.state.isNullContent ? <Modal
                        onCancel={()=>this.setState({isNullContent:false})}
                        onConfirm={()=>this.setState({isNullContent:false})}
                    >标题和内容都不能为空</Modal> : null
                }
                {
                    this.state.isShowModal ?
                        <Modal
                            onCancel={()=>this.cancelEvent()}
                            onConfirm={()=>this.confirmEvent()}
                        >
                            <div className="inputContainer center" style={{backgroundColor:'#f1f1f1'}}>
                                <input onChange={(e)=>{console.log(e.target.value);this.setState({inputValue:e.target.value})}} className="inputDefault" type="text" placeholder="请输入标题" autoFocus={true} />
                            </div>
                        </Modal> : null
                }
            </div>
        )
    }
}

export default connect((store)=>{
    console.log(store);
    return {
        taskStore:store.taskStore
    }
})(SetTaskPage)