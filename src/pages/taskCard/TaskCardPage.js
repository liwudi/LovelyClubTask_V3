/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import './css/taskCardPage.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';
import Button from '../../components/Button';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[]
        }
    }
    renderContent(){
        return (
            <div>
                <p className="center">暂未布置作业，点击下方按钮为</p>
                <p className="center">你的学员布置作业</p>
            </div>
        )
    }

    /**
     * @todo:问题描述
     * @param history
     * @function gotoTop 作用：
     */
    gotoTop(history){
        this.props.history.push("/home")

    }
    renderCard(){
        
    }
    render(){
        console.log('当前history',this.props.history);
        return(
            <div className="pageBox">
                <TopBanner title="作业卡" router={this.props.history} />
                <div className="fx1 center">
                    <div className="bgWhite paddingBottom" style={{width:'80%',borderRadius:'10px',overflow:"hidden"}}>
                        <div className="colorWhite center bgOrange" style={{width:"100%",height:'40px'}}>作业卡</div>
                        <div className="center" style={{width:'100%',height:'50px'}}>数学</div>
                        <div className="center" style={{width:'100%',height:'50px'}}>我是一个小逗比，咿呀咿呀咦！！</div>
                        <div className="center" style={{width:'100%',height:'100px'}}>
                            二维码图片区
                        </div>
                        <div>
                            <p className="center note padding">长按扫描二维码领取作业</p>
                            <p className="center note padding">完成作业即可获得专属成就卡</p>
                        </div>
                    </div>
                </div>
                <div className="cardBottom bgWhite paddingTop">
                    <p className="center">长按保存图片，可在课程内发送</p>
                    <p className="center">学员扫码后即可领取作业</p>
                    <div className="center marginTop">
                        <Button onClick={()=>{this.gotoTop()}} title="返回作业管理" style={{width:'50%',height:'30px'}} />
                    </div>
                    <div style={{height:'40px'}}></div>
                </div>
            </div>
        )
    }
}