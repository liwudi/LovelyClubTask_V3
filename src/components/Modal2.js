/**
 * Created by mapbar_front on 2017/9/7.
 */
import React,{ Component } from 'react';
import '../css/common.css';
import ViewForRightDom from './ViewForRightDom';
export default class Modal1 extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div  className="fx1 disFx" style={{flexDirection:"column",backgroundColor:"rgba(0,0,0,0.5)",position:'absolute',left:0,top:0,zIndex:100,width:"100%",height:"100%"}}>
                <div onClick={()=>{this.props.onCancel && this.props.onCancel()}} className="fx1"></div>
                <div className="bgWhite">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}