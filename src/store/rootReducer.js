import { combineReducers } from 'redux';
import user from "./reducer/userReducer"
import people from "./reducer/peopleReducer"

const rootReducer = combineReducers({
  user,
  people
});

export default rootReducer;
