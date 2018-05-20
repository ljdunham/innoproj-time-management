import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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
    console.log(this.props)
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
    const task_form = (
      <div>
        <h4>Add new task</h4>
        <form id="task_form" onSubmit={this.handleSubmit} >
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
        <input type="date" name='start' value="2013-09-02" required onChange={this.handleChange} />
          </label>

          <label>
            End:
        <input type="date" name='end'  value="2014-09-02" required onChange={this.handleChange} />
          </label>

          <input type='submit' onClick={this.props.refresh} value="Submit" />
        </form >
      </div>)

    return (
      <div>
        {task_form}
      </div>

    )
  }
}

export default TaskForm;
