import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import _ from "lodash";
import ReminderItemList from "./ReminderItemList";

class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      id: "",
      title: "",
      start: "",
      date: "",
      method: "email",
      minutes: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ id: this.props._id });
    this.getReminders(this.props._id);
    console.log(this.props._id);
  }

  getReminders(id) {
    axios
      .get("/api/getReminders/" + id)
      .then(response => {
        console.log("THis is the response" + response.data);
        this.setState({ reminders: response.data });
      })
      .catch(error => console.log(error));
  }
  componentDidUpdate() {
    console.log(this.state.reminders);
    this.getReminders(this.props._id);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.props.addTask(this.state);
    this.props.addReminder(this.state);
  }

  renderTask() {
    //console.log("props" + this.props.start);

    const { title, complete } = this.props;
    const taskStyle = {
      color: complete ? "green" : "red"
    };

    return <td style={taskStyle}>{title}</td>;
  }

  renderDetails() {
    const { description, start } = this.props;
    const detailsStyle = {
      color: "black"
    };

    return (
      <td>
        <Popup
          trigger={<button style={detailsStyle}> Details</button>}
          position="right center"
        >
          <div style={{ color: "black" }}>
            <strong>
              Description: <br />
            </strong>
            {description}
            <br />
            <strong>
              Start: <br />
            </strong>

            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit"
            }).format(new Date(start))}
          </div>
        </Popup>
      </td>
    );
  }

  renderTaskAction() {
    const { _id } = this.props;

    if (this.props.complete) {
      return <td>Task Completed</td>;
    }
    return (
      <td>
        <button onClick={this.props.completeTask.bind(this, _id)}>
          Complete
        </button>

        <Popup trigger={<button> Add reminder</button>} position="right center">
          <div>
            <form onSubmit={this.handleSubmit}>
              Title:
              <input
                type="text"
                name="title"
                required
                onChange={this.handleChange.bind(this)}
              />
              Date:
              <input
                type="date"
                name="date"
                required
                onChange={this.handleChange.bind(this)}
              />
              Time:
              <input
                type="time"
                name="start"
                required
                onChange={this.handleChange.bind(this)}
              />
              <input type="submit" value="Add" />
            </form>
          </div>
        </Popup>
        <Popup
          trigger={<button>Show reminders</button>}
          position="right center"
        >
          <div>
            <ReminderItemList reminders={this.state.reminders} />
          </div>
        </Popup>
      </td>
    );
  }

  refreshReminders = res => {
    this.setState({ reminders: res.data });
  };

  removeTheTask() {
    this.props.completeTask(this.props._id);
    this.props.deleteTask(this.props._id);
  }

  renderCol() {
    return (
      <td>
        <button onClick={this.removeTheTask.bind(this)}>Delete</button>
      </td>
    );
  }
  render() {
    return (
      <tr>
        {this.renderTask()}
        {this.renderDetails()}
        {this.renderTaskAction()}
        {this.renderCol()}
      </tr>
    );
  }
}

export default TaskListItem;
