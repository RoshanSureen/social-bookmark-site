import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { profileReducer, accountReducer, BookmarkReducer } from "../reducers";

var store;
export default {
  configureStore: () => {
    const reducers = combineReducers({
      profile: profileReducer,
      account: accountReducer,
      bookmark: BookmarkReducer
    });
    store = createStore(
      reducers,
      applyMiddleware(thunk)
    );
    return store;
  },
  currentStore: () => {
    return store;
  }
}