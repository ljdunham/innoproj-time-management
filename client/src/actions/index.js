import axios from "axios";
import { FETCH_USER } from "./types";

//Redux-thunk is invoked immediately by returning a function and it passes the dispatch function
//as an argument to it.
//As this is an asyncronous request we want to decide when to send the data to the dispact function so..
//after we have gotten the users data
export const fetchUser = () => {
  return function(dispatch) {
    // automatically will use the reducers defined in client/index.js
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

/*// Traditional way without redux-thunk now returning only the action
  // and continuing wih the dispatch function
  export const fetchUser = () => {
  const request = axios.get("/api/current");
  
  return {
    type: FETCH_USER,
    payload: request
  };
}*/

//ES2017 or something
/*
export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res });
    };
  };

*/
