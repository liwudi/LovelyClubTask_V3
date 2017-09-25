/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';

export default class ViewForRightDom extends Component{
    clickEvent(){
        this.props.onClick && this.props.onClick();
    }
    renderRight(){
        if(this.props.rightView){
            return this.props.rightView();
        }else{
            return null
        }
    }
    render(){
        return (
            <div style={this.props.style} onClick={()=>{this.clickEvent()}} className="viewForRightArrow bgWhite borderBottom disFx rowCenter">
                <p className="marginLeft">{this.props.title ? this.props.title : '作业标题'}</p>
                <div className="marginRight">
                    {
                        this.renderRight()
                    }
                </div>

            </div>
        )
    }
}