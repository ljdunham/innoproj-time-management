import React, { Component } from "react";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state);
    //console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Title:
        <input
          type="text"
          name="title"
          placeholder="Task title"
          required
          onChange={this.handleChange.bind(this)}
        />
        Description:
        <input
          type="text"
          name="description"
          required
          onChange={this.handleChange.bind(this)}
        />
        Start:
        <input
          type="date"
          name="start"
          required
          onChange={this.handleChange.bind(this)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateTask;
