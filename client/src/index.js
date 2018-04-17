import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//Development testing from browser console
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// div with id root will be in the production build's index.html file to display app
ReactDOM.render(
  // Provider that knows to read changes from our redux store
  // when it gets new states produced insiede of it
  // the provider will inform all of its children components
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
