import { combineReducers} from "redux";

import main from "./main";
import search from "./search";
import username from "./username";
import repository from "./repository";

export default combineReducers({
  main,
  search,
  username,
  repository,
});
