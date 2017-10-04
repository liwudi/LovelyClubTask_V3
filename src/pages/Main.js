/**
 * Created by mapbar_front on 2017/9/5.
 */
import React,{ Component } from 'react';
import { BrowserRouter as Router, Link, Route,Switch} from 'react-router-dom';
import createBrowserHistory from 'history';

import Entry from './entry/Entry';
import HomePage from './home/HomePage';
import SetTaskPage from './SetTask/SetTaskPage';
import TaskContent from './taskContent/TaskContent';
import RelatedCoursePage from './relatedCourses/RelatedCoursePage';
import TaskCardPage from './taskCard/TaskCardPage';
import TaskDetailPage from './taskDetail/taskDetailPage';
import EditTask from './editTask/EditTask';

import MyTask from './myTask/MyTask';
const history = createBrowserHistory;
export default class Main extends Component{
    render(){
        return(

            <Router history={history}>
                <div className="disFx boxSizing" style={{width:"100%",height:'100%',overflow:'hidden'}}>
                    <Switch>

                        <Route path="/home" component={HomePage}/>

                        <Route path="/setTaskPage/:isEditPage" component={SetTaskPage} />
                        <Route path="/taskContent/:taskSubjectId" component={TaskContent} />
                        <Route path="/relatedCourses" component={RelatedCoursePage} />
                        <Route path="/taskCard/:taskId" component={TaskCardPage} />
                        <Route path="/taskDetail/:id" component={TaskDetailPage} />
                        <Route path="/editTask/:type" component={EditTask} />
                        <Route path="/mytask/:taskId" component={MyTask} />
                        <Route path="/" component={Entry}/>
                    </Switch>

                </div>
            </Router>
        )
    }
}
