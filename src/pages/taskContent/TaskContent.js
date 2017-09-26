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
import { saveTaskFinished } from '../../services/AppServices';

class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            taskSubjectId: props.match.params.taskSubjectId,

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
    render(){

        return(
            <div className="pageBox">
                <TopBanner title="作业内容" router={this.props.history} />
                <div className="marginTop">
                    {
                        this.renderContent()
                    }
                </div>
                <div className="otherInfo bgWhite disFx">
                    <div
                        onClick={()=>this.setState({isAddVoice:true})}
                        className="fx1 center borderRight padding"
                    >添加语音
                    </div>
                    <div
                        onClick={()=>this.setState({isAddPic:true})}
                        className="fx1 center padding"
                    >添加图片</div>
                </div>
                <div className="buttonContainer center">
                    <Button onClick={()=>{this.goBack()}} style={{width:'90%'}} />
                </div>
                {
                    this.state.isAddVoice ? <Modal1 onCancel={()=>{this.setState({isAddVoice:false})}} />:null
                }
                {
                    this.state.isAddPic ? <Modal1 type={1} onCancel={()=>{this.setState({isAddPic:false})}} />:null
                }
                {
                    this.state.isShowFailInfo ? <Modal>信息提交失败</Modal> : null
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