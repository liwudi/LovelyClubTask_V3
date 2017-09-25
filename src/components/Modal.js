/**
 * Created by mapbar_front on 2017/9/6.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class Modal extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div style={{width:"100%",height:"100%",position:"absolute",left:0,top:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <div className="bgWhite" style={{width:'70%',position:'absolute',left:"15%",top:"30%",borderRadius:'10px'}}>
                    <p className="center padding">作业标题</p>
                    <div className="inputBox center" >
                        {
                            this.props.children
                        }

                    </div>
                    <div className="borderTop disFx marginTop">
                        <div
                            className="fx1 center padding borderRight"
                            onClick={() => this.props.onCancel && this.props.onCancel()}
                        >取消</div>
                        <div
                            className="fx1 center padding colorRed"
                            onClick={() => this.props.onConfirm && this.props.onConfirm()}
                        >确定</div>
                    </div>
                </div>
            </div>
        )
    }
}