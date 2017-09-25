/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/common.css';
import TopBanner from '../../components/TopBanner';
import NewTask from '../../components/NewTask';
import ViewForRightDom from '../../components/ViewForRightDom';
export default class RelatedCoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex:0,
            courseList:[],
            seriesCourseList:[]
        }
    }
    renderSeriesCourse(){
        if(this.state.seriesCourseList.length == 0){
            return <div style={{width:'100%',height:"100px"}} className="center note">暂无系列课</div>
        }
    }
    renderCourse(){
        if(this.state.courseList.length == 0){
            return <div style={{width:'100%',height:"100px"}} className="center note">暂无课程</div>
        }
    }
    render(){
        return(
            <div className="pageBox fx1">
                <TopBanner title="布置作业-关联课程" router={this.props.history} />
                <div className="borderTop rowCenter disFx bgWhite" style={{width:'100%',height:'50px'}}>
                    <div
                        className="fx1 center borderRight"
                        style={{color:this.state.currentIndex == 0?'red':'black' }}
                        onClick={()=>this.setState({currentIndex:0})}
                    >
                        课程
                    </div>
                    <div
                        className="fx1 center"
                        style={{color:this.state.currentIndex == 1?'red':'black' }}
                        onClick={()=>this.setState({currentIndex:1})}
                    >
                        系列课
                    </div>
                </div>
                <div className="marginTop">
                    <ViewForRightDom title="不关联课程" />
                </div>
                <div className="fx1">
                    {
                        this.state.currentIndex? this.renderSeriesCourse():this.renderCourse()
                    }
                </div>
            </div>
        )
    }
}