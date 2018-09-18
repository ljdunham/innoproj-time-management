import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions"; //importing all actions to actions object

//Importing components
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

//Another way is to not import the { Component } and just write extends React.Component

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); //Explanation check bottom export statement
  }
  render() {
    return (
      //materialize css expects "container" as top level element which gives us a centered view
      //for the content
      // Setting up which components are displayed at which route
      // Header always visible, landing only visible when in root
      // and Dashboard when we go to /main
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route path="/main/viewTask" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// actions are assigned to the App component as props
// in other words the wiring is been completed and we can use e.g fetchUser() from
// this.props.
export default connect(
  null,
  actions
)(App);
