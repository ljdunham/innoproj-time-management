import { combineReducers } from "redux";
import authReducer from "./authReducer";

// auth piece of state is produced by the authReducer
export default combineReducers({
  auth: authReducer
});
