import _ from "lodash";
import React, { Component } from "react";
import TaskHeader from "./TaskHeader";
import TaskListItem from "./TaskListItem";

//Change index etc.

class TaskList extends Component {
  // {...row} is the same as
  // function(row) {
  //    return <TaskListItem />
  // }
  // task = {todo.task} isCompleted = {todo.isCompleted}

  renderItems() {
    //console.log(this.props.rows);
    return _.map(this.props.rows, row => (
      <TaskListItem key={row._id} {...row} {...this.props} />
    ));
  }

  render() {
    return (
      <table>
        <TaskHeader />
        <tbody>{this.renderItems()}</tbody>
      </table>
    );
  }
}

export default TaskList;
