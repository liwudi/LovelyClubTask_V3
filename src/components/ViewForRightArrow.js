/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskTitle:null,
            taskContent:null,
            connectCourse:null,
        }
    }

    renderRight(){
        if(this.props.rightView){
            return this.props.rightView()
        } else if(this.props.prompt){
            return (
                <div className="rowCenter">
                    <span className="note">{this.props.prompt}</span>
                    <img className="iconRightArrow" src={require("../assets/images/rightArrow.png")} />
                </div>
            )
        }else{
            return (
                <div className="rowCenter">
                    <span className="note">未填写</span>
                    <img className="iconRightArrow" src={require("../assets/images/rightArrow.png")} />
                </div>
            )
        }
    }
    clickEvent(){
        this.props.onClick && this.props.onClick();
    }
    render(){
        return(
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