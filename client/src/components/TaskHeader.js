import React, { Component } from "react";

class TaskHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Task</th>
          <th>Info</th>
          <th>Action</th>
          <th />
        </tr>
      </thead>
    );
  }
}

export default TaskHeader;
