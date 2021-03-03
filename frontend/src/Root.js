import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";

import rootReducer from "./Reducer";
import { setCurrentAuthor, setCurrentUser, setToken } from "./components/login/LoginActions";
import { isEmpty } from "./utils/Utils";

const Root = ({ children, initialState = {} }) => {
  const history = createBrowserHistory();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [thunk, routerMiddleware(history)];

  const store = createStore(rootReducer(history), initialState, composeEnhancers(applyMiddleware(...middleware)));

  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(setToken(localStorage.getItem("token")));
  }
  if (!isEmpty(localStorage.getItem("user"))) {
    const user = JSON.parse(localStorage.getItem("user"));
    store.dispatch(setCurrentUser(user, ""));
  }
  if (!isEmpty(localStorage.getItem("author"))) {
    const author = JSON.parse(localStorage.getItem("author"));
    store.dispatch(setCurrentAuthor(author, ""));
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};

export default Root;
