/**
 * Created by mapbar_front on 2017/9/7.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import TopBanner from '../../components/TopBanner';
import Button from '../../components/Button';
import Img from '../../components/Img';

import { saveTaskFinished,findTaskSubjectById,getUserInfo } from '../../services/AppServices';

export default class MyTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskSubjectId: props.match.params.taskId,
            taskTitle:'数学',
            taskContent:'我是一个小逗比，咿呀咿呀咦！！',
        }
    }
    fetchData(){
        let content = this.state.taskContent;
        let taskSubjectId = 1;
        let userId = localStorage.getItem('userInfo').openId;
        saveTaskFinished(content,taskSubjectId,userId).then(res => {
            console.log(res);
        })
    }
    fetchData1(){
        let taskSubjectId = this.state.taskSubjectId;
        let _this = this;
        findTaskSubjectById(taskSubjectId).then(res => {
            res = JSON.parse(res);
            console.log('findTaskSubjectById',res);
            _this.setState({
                taskTitle: res.subject,
                taskContent:res.content
            })
        })
    }
    componentDidMount(){
        this.fetchData1();
    }
    gotoTaskContent(){
        let str = JSON.stringify({type:2,taskSubjectId:this.state.taskSubjectId});

        this.props.history.push(`/taskContent/${str}`)
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="我的作业" router={this.props.history} />
                <div className="fx1 bgWhite borderTop">
                    <div className="detail">
                        <div className='center marginTop'>
                            <Img />
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

                    <div className="center marginTop">
                        <Button onClick={()=>this.gotoTaskContent()} title="交作业" style={{width:"100px",height:"35px"}} />
                    </div>
                </div>
            </div>
        )
    }
}