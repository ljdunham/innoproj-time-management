import React, { Component } from "react";
import ReactDOM from "react-dom";


class AddButton extends Component {

  render() {
    return (<a href="/addTask" class="btn-floating btn-medium waves-effect waves-light red left" ><i class="material-icons">add</i></a>)
  }
}

export default AddButton;