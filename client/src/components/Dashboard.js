import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TaskForm from "./TaskForm";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      showForm: false,
    };
    this.getAllTasks = this.fetchAllTasks.bind(this);
    this.clearAll = this.clearAllTasks.bind(this);
    this.addTask = this.addNewTask.bind(this);
  }

  fetchAllTasks() {
    axios.get('/api/getTasks').then(response => { this.setState({ rows: response.data }); console.log(response) }).catch(error => console.log(error))
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



  render() {

    /*
    const isLoading = this.state.isLoading;

    const loading_icon = isLoading ? (<div><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span></div>) : (<div></div>);
    */
    const clear_all_button = (<button className="btn-floating pulse right" onClick={this.clearAll} type="button"><i className="small material-icons">clear_all</i></button>);
    const add_button = (<a href="#task_form" class="btn-floating btn-medium waves-effect waves-light red right" onClick={this.addTask} ><i class="material-icons">add</i></a>)

    return (
      <div>

        <div className="text-center">
          {/* Fix me, I know it's not easy, somehow getting user name here */}
          <h3>Dashboard, welcome duonghailee </h3>
        </div>
        <div>
          <button class="btn waves-effect waves-light" type="button" onClick={this.getAllTasks}>Your tasks</button>
          {add_button}
        </div>
        {/*{loading_icon}*/}

        <div id="totolist">
          <ul className="collection">
            {this.state.rows.map((row, index) => <li key={row.title + index} className="collection-item"><div>{row.title}<a href="#" className="secondary-content"><i className="material-icons">check</i></a></div></li>)}
          </ul>
          {clear_all_button}

        </div>

        {this.state.showForm ? <TaskForm refresh={this.fetchAllTasks} /> : <div></div>}

      </div>
    )
  }
};


export default Dashboard;

