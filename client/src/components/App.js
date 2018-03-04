import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions"; //importing all actions to actions object

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;

//Another way is to not import the { Component } and just write extends React.Component
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      //materialize css expects "container" as top level element which gives us a centered view
      //for the content
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route path="/main" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//actions are assigned to the App component as props
export default connect(null, actions)(App);
