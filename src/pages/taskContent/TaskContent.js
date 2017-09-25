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
import {
    TYPES,
    TaskActions
} from '../../actions/index';
class TaskContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[]
        }
    }
    renderContent(){
        return (
            <div>
                <textarea onChange={(e)=>{this.setState({inputValue:e.target.value})}} placeholder="请输入作业内容" className="textArea"></textarea>
            </div>
        )
    }
    goBack(){
        this.props.dispatch(TaskActions.taskContent(this.state.inputValue));
        this.props.history.goBack();
    }
    render(){
        console.log('location',this.props.location.state);
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
            </div>
        )
    }
}

export default connect((store)=>{
    return {
        taskStore:store.taskStore
    }
})(TaskContent);