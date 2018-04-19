import React, { Component } from "react";
import ReactDOM from "react-dom";



class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
    };
    this.getTodoList = this.fetchTodo.bind(this);
  }

  fetchTodo() {

    fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()).then(data => this.setState({rows:data.slice(1,6)}));

  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h3>Dashboard, welcome xxx </h3>
        </div>
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.getTodoList} type="button">Your courses</button>
        <div id="totolist">
          <ol>
            {this.state.rows.map((row, index) => <li key={row.title + index}>{row.title}</li>)}
          </ol>
        </div>

      </div>
    )
  }
};

export default Dashboard;

