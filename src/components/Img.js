/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import '../css/common.css';
export default class Img extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <img className="img" src={require('../assets/images/TaskDetail.jpg')} />
        )
    }
}