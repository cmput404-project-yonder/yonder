import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { streamReducer } from "./components/stream/StreamReducer";
import { profileReducer } from "./components/profile/ProfileReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    stream: streamReducer,
    profile: profileReducer,
  });

export default createRootReducer;
