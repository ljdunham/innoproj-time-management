import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      tasklist: null,
      username: ""
    };
  }

  componentDidMount() {
    this.getAllTasks();
    this.getUsername();
  }

  renderContent() {
    switch (this.state.tasklist) {
      case null:
        return <div>Loading...</div>;

      case false:
        return <CreateTask addTask={this.addTask.bind(this)} />;

      default:
        return (
          <TaskList
            rows={this.state.rows}
            deleteTask={this.deleteTask.bind(this)}
            completeTask={this.completeTask.bind(this)}
          />
        );
    }
  }

  createTask() {
    this.setState({ tasklist: false });
  }

  getAllTasks() {
    axios
      .get("/api/getTasks")
      .then(response => {
        this.setState({ rows: response.data, tasklist: true });
      })
      .catch(error => console.log(error));
  }

  deleteTask(id) {
    var task = { taskid: id };
    axios
      .post("/api/deleteTask", task)
      .then(response => {
        this.getAllTasks();
      })
      .catch(error => console.log(error));
  }

  completeTask(id) {
    var task = { taskid: id };
    axios
      .post("/api/completeTask", task)
      .then(response => {
        this.getAllTasks();
      })
      .catch(error => console.log(error));
  }

  addTask(task) {
    console.log("task");

    axios
      .post("/api/addTask", task)
      .then(response => {
        this.getAllTasks();
      })
      .catch(error => console.log(error));
  }

  getUsername() {
    axios.get("/api/current_user").then(user => {
      console.log(user.data.userName);
      this.setState({ username: user.data.userName });
    });
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h3>Dashboard, welcome {this.state.username} </h3>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="button"
          onClick={this.getAllTasks.bind(this)}
        >
          Your tasks
        </button>
        <a
          className="btn-floating btn-medium waves-effect waves-light red right"
          onClick={this.createTask.bind(this)}
        >
          <i className="material-icons">add</i>
        </a>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default Dashboard;
