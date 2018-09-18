import _ from "lodash";
import React, { Component } from "react";
import ReminderItem from "./ReminderItem";

//Change index etc.

class ReminderItemList extends Component {
  // {...row} is the same as
  // function(row) {
  //    return <TaskListItem />
  // }
  // task = {todo.task} isCompleted = {todo.isCompleted}

  renderItems() {
    return _.map(this.props.reminders, reminder => (
      <ReminderItem
        key={reminder.taskid + reminder.title}
        {...reminder}
        {...this.props}
      />
    ));
  }
  render() {
    return (
      <table>
        <tbody>{this.renderItems()}</tbody>
      </table>
    );
  }
}

export default ReminderItemList;
