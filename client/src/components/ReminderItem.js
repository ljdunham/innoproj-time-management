import React, { Component } from "react";

class ReminderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: 0
    };
  }

  componentDidMount() {
    console.log("REMINDERITEM" + this.props);
  }

  renderTitle() {
    return (
      <td>
        <strong>Title:</strong>
        {this.props.title}
        <br />
        <strong>Reminding:</strong>
        {Date(this.props.start)}
        <br />
        <strong>Method:</strong>

        {this.props.method}
      </td>
    );
  }

  render() {
    return <tr>{this.renderTitle()}</tr>;
  }
}

export default ReminderItem;
