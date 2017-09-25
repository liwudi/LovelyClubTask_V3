/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

import '../css/common.css';
export default class NewTask extends Component{
    render(){
        return(
            <div className="baseViewDom colorRed center">
                {this.props.children}
            </div>
        )
    }
}