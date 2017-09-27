/**
 * Created by mapbar_front on 2017/9/7.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import TopBanner from '../../components/TopBanner';

import ViewForRightArrow from '../../components/ViewForRightArrow';
export default class TaskDetail extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="pageBox">
                <TopBanner title="入口页面" router={this.props.history} />
                <div className="fx1 bgWhite borderTop">
                    <ViewForRightArrow prompt="点击进入" onClick={()=>this.props.history.push('/home')} title="教师入口" />
                    <ViewForRightArrow prompt="点击进入" onClick={()=>this.props.history.push('/mytask/1')} title="学生入口" />
                </div>
            </div>
        )
    }
}

/**
 * @todo:目前有userId的问题，需要明天再进行接口梳理
 *
 * @todo:需要做调用微信js-sdk的动画。
 */
