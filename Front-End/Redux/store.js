import { createStore, combineReducers } from "redux";

import userReducer from "./userSlice";
import sessionReducer from "./sessionSlice";
import dropDownReducer from "./MenuListSlice";
import settingsReducer from "./AppSettingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  menu: dropDownReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
