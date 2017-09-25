/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class TopBanner extends Component{
    constructor(props){
        super(props);
    }
    goBack(){
        this.props.router && this.props.router.goBack();
    }
    leftView(){
        if(this.props.leftView){
            return this.props.leftView();
        }else{
            return (
                <div onClick={() => this.goBack()} className="topBannerLeft center" >
                    <img style={{width:'20px',height:'20px'}} src={require("../assets/images/leftArrow.png")} />
                </div>
            )

        }

    }
    render(){
        return (
            <div className='topBanner rowCenter'>
                {this.leftView()}
                <span>
                    {this.props.title?this.props.title:"默认标题"}
                </span>
            </div>
        )
    }
}