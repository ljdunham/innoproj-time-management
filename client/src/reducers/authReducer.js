import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case FETCH_USER:
      //if action payload is empty "user not logged in" return false
      return action.payload || false;
    default:
      return state;
  }
}
