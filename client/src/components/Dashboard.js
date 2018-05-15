import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      isLoading: false,
      showForm : false,
    };
    this.getAllTasks = this.fetchAllTasks.bind(this);
    this.clearAll = this.clearAllTasks.bind(this);
    this.addTask = this.addNewTask.bind(this);
  }

  fetchAllTasks() {
    axios.get('/api/getTasks').then(response => {this.setState({ rows: response.data, isLoading: true }) ; console.log(response)}).catch(error => console.log(error))
  }

  clearAllTasks() {
    const id = '5ae4eb09dbaac609b7379a45';
    axios.post('/api/completeTask', {taskid: id}).then(response => console.log(response)).catch(error => console.log(error))
  }

  addNewTask(){
   /* this.setState({ {this.state.showForm ? false : true }}) */
   this.state.showForm = true;
  }



  render() {
    const isLoading = this.state.isLoading;

    const loading_icon = isLoading ? (<div><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span></div>) : (<div></div>);
    const clear_all_button = isLoading ? (<button className="btn-floating pulse right" onClick={this.clearAll} type="button"><i className="small material-icons">clear_all</i></button>) : (<div></div>);

    return (
      <div>

        <div className="text-center">
          <h3>Dashboard, welcome duonghailee </h3>
        </div>
        <div>
          <button class="btn waves-effect waves-light" type="button" onClick={this.getAllTasks}>Your tasks</button>
          <a class="btn-floating btn-medium waves-effect waves-light red right" onClick={this.addTask}><i class="material-icons">add</i></a>
        </div>
        {/*{loading_icon}*/}
        <div id="totolist">
          <ul className="collection">
            {this.state.rows.map((row, index) => <li key={row.title + index} className="collection-item"><div>{row.title}<a href="#" className="secondary-content"><i className="material-icons">send</i></a></div></li>)}
          </ul>
          {clear_all_button}
         
        </div>



        <TaskForm showForm={this.state.showForm}/>
      </div>
    )
  }
};

/* create a form to insert new task */
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', start: '', end: '', complete: false }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
    axios.post('/api/addTask', {
      title: this.state.title,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const task_form = this.props.showForm ? (<form onSubmit={this.handleSubmit} >
      <label>
        Title:
        <input type="text" name='title' required onChange={this.handleChange} />
      </label>

      <label>
        Description:
        <input type="text" name='description' required onChange={this.handleChange} />
      </label>

      <label>
        Start:
        <input type="date" name='start' required onChange={this.handleChange} />
      </label>

      <label>
        End:
        <input type="date" name='end' required onChange={this.handleChange} />
      </label>

      <input type='submit' value="Submit" />
    </form >) : (<div></div>)
    return (
      <div>
        {task_form}
      </div>

    )
  }


}


export default Dashboard;

