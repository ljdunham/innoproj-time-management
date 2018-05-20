import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TaskForm from "./TaskForm";
import Task from "./Task"


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      showForm: false,
      showTaskDetail: false,
    };
    this.getAllTasks = this.getAllTasks.bind(this);
    this.clearAllTasks = this.clearAllTasks.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleSingleTask = this.handleSingleTask.bind(this);
  }

  getAllTasks() {
    axios.get('/api/getTasks').then(response => { this.setState({ rows: response.data }); console.log(response) }).catch(error => alert('please login'))
  }

  clearAllTasks() {
    const id = '5ae4eb09dbaac609b7379a45';
    axios.post('/api/completeTask', { taskid: id }).then(response => console.log(response)).catch(error => console.log(error));
    this.setState({ rows: [] })
  }

  addNewTask() {
    /* this.setState({ {this.state.showForm ? false : true }}) */
    this.setState({ showForm: true });
  }

  handleSingleTask(){
    this.setState({showTaskDetail: this.state.showTaskDetail ? false : true})
  }



  render() {

    /*
    const isLoading = this.state.isLoading;

    const loading_icon = isLoading ? (<div><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span></div>) : (<div></div>);
    */
    const clear_all_button = (<button className="btn-floating pulse right" onClick={this.clearAllTasks} type="button"><i className="small material-icons">clear_all</i></button>);
    const add_button = (<a href="#task_form" className="btn-floating btn-medium waves-effect waves-light red right" onClick={this.addNewTask} ><i className="material-icons">add</i></a>)
    const task_detail = this.state.showTaskDetail ? (<p>show task </p>) : <div></div>

    return (
      <div>

        <div className="text-center">
          {/* Fix me, I know it's not easy, somehow getting user name here */}
          <h4>Dashboard, How do you do </h4>
        </div>
        <div>
          <button id="view_all_task" className="btn waves-effect waves-light" type="button" onClick={this.getAllTasks}>Your tasks</button>
          {add_button}
        </div>
        {/*{loading_icon}*/}

        <div id="task-list">
          <ul className="collection">
            {this.state.rows.map((row, index) => <li key={row.title + index} className="collection-item"><div>{row.title}<a onClick={this.handleSingleTask} role="button" className="secondary-content"><i className="material-icons">arrow_drop_down</i></a>{task_detail}</div></li>)}
          </ul>
          {clear_all_button}

        </div>
        { /*{hidden_info} */}
        {this.state.showForm ? <TaskForm refresh={this.getAllTasks} /> : <div></div>}

      </div>
    )
  }
};


export default Dashboard;

