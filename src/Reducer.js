import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { streamReducer } from "./components/stream/StreamReducer";
import { profileReducer } from "./components/profile/ProfileReducer";
import { postReducer } from "./components/stream/posts/PostReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    stream: streamReducer,
    profile: profileReducer,
    post: postReducer,
  });

export default createRootReducer;
