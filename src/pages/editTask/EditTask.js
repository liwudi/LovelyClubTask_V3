/**
 * Created by mapbar_front on 2017/10/3.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../css/common.css';
import '../../css/setTaskPage.css';
import TopBanner from '../../components/TopBanner';
import Modal from '../../components/Modal';

import ViewForRightArrow from '../../components/ViewForRightArrow';

import { updateTaskSubject } from '../../services/AppServices';


export default class EditTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:'',
            taskSubjectId:'',
            isChecked:false,
            isShowModal:false,
            taskContent:''
        }
    }
    getCardEvent(){
        let id = this.props.taskStore.taskId;
        let userid = JSON.parse(localStorage.getItem('userInfo')).openId;
        let subject = this.props.taskStore.taskTitle || this.state.taskTitle;
        let content = this.props.taskStore.taskContent || this.state.taskContent;
        let ids = this.props.taskStore.taskSubjectId || this.state.taskSubjectId;
        //更新作业题目，id是正值。
        this.isGetFromEdit() && updateTaskSubject(subject,content,id,userid).then(res => {
            this.props.history.goBack();
        });
        alert('这时候需要上传的负值id'+ids);
        //布置作业题目获取作业卡，id是负值
        !this.isGetFromEdit() && saveTaskSubject(subject,content,userid,ids).then(res => {
            console.log('saveTaskSubject',res);
            this.props.history.push(`/taskCard/{false}`);
        });
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
                            onClick={()=>{this.props.history.push(`/taskContent/${false}`)}}
                            rightView={()=>_rightViewContent()}
                            style={{justifyContent:'space-between'}}
                        />
                    </div>
                    <div className="marginTop">
                        <ViewForRightArrow
                            title='关联课程'
                            style={{borderBottom:'1px solid #cccccc',justifyContent:'space-between'}}
                            prompt="未关联"
                            onClick={()=>{return;this.props.history.push('/relatedCourses')}}
                        />
                        <ViewForRightArrow
                            title='仅课程报名者可交作业'
                            style={{justifyContent:'space-between'}}
                        />
                    </div>
                </div>
                <div className="buttonContainer center">
                    <div
                        className="bigBtn center bgred"

                        onClick={()=>{this.getCardEvent()}}
                    >保存</div>
                </div>
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
