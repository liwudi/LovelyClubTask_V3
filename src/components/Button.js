/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class TopBanner extends Component{
    constructor(props){
        super(props);
    }
    clickEvent(){
        this.props.onClick && this.props.onClick();
    }

    render(){
        return (
            <div onClick={()=>{this.clickEvent()}} className="bigBtn center bgred" style={this.props.style}>{this.props.title || '确认'}</div>
        )
    }
}