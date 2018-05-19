import React, { Component } from "react";

class TaskListItem extends Component {
  renderTask() {
    const { title, complete } = this.props;
    const taskStyle = {
      color: complete ? "green" : "red"
    };

    return <td style={taskStyle}>{title}</td>;
  }

  renderTaskAction() {
    const { _id } = this.props;
    if (this.props.complete) {
      return (
        <td>
          <button onClick={this.props.deleteTask.bind(this, _id)}>
            Delete
          </button>
        </td>
      );
    }
    return (
      <td>
        <button onClick={this.props.completeTask.bind(this, _id)}>
          Complete
        </button>
        <button onClick={this.props.deleteTask.bind(this, _id)}>Delete</button>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderTask()}
        {this.renderTaskAction()}
      </tr>
    );
  }
}

export default TaskListItem;
